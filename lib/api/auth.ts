import type { NextRequest } from "next/server"
import { createClient } from "@/lib/supabase/server"

export interface AuthResult {
  success: boolean
  error?: string
  client_id?: string
  permissions?: string[]
}

export async function verifyApiKey(request: NextRequest): Promise<AuthResult> {
  try {
    const apiKey = request.headers.get("X-API-Key") || request.headers.get("Authorization")?.replace("Bearer ", "")

    if (!apiKey) {
      return { success: false, error: "API key required" }
    }

    const supabase = createClient()

    // Verify API key
    const { data: keyData, error } = await supabase
      .from("api_keys")
      .select("*")
      .eq("key_hash", apiKey)
      .eq("is_active", true)
      .single()

    if (error || !keyData) {
      return { success: false, error: "Invalid API key" }
    }

    // Check rate limits
    const now = new Date()
    const hourAgo = new Date(now.getTime() - 60 * 60 * 1000)

    const { count } = await supabase
      .from("api_requests")
      .select("*", { count: "exact", head: true })
      .eq("client_id", keyData.client_id)
      .gte("created_at", hourAgo.toISOString())

    if (count && count >= keyData.rate_limit) {
      return { success: false, error: "Rate limit exceeded" }
    }

    // Log API request
    await supabase.from("api_requests").insert({
      client_id: keyData.client_id,
      endpoint: request.url,
      method: request.method,
      ip_address: request.headers.get("x-forwarded-for") || "unknown",
    })

    // Update last used
    await supabase.from("api_keys").update({ last_used_at: now.toISOString() }).eq("id", keyData.id)

    return {
      success: true,
      client_id: keyData.client_id,
      permissions: keyData.permissions,
    }
  } catch (error) {
    return { success: false, error: "Authentication failed" }
  }
}
