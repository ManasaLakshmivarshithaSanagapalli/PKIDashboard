import { type NextRequest, NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/server"

export async function POST(request: NextRequest) {
  try {
    const { api_key } = await request.json()

    if (!api_key) {
      return NextResponse.json({ error: "API key required" }, { status: 401 })
    }

    const supabase = createClient()

    // Verify API key
    const { data: apiKey, error } = await supabase
      .from("api_keys")
      .select("*")
      .eq("key_hash", api_key)
      .eq("is_active", true)
      .single()

    if (error || !apiKey) {
      return NextResponse.json({ error: "Invalid API key" }, { status: 401 })
    }

    // Update last used timestamp
    await supabase.from("api_keys").update({ last_used_at: new Date().toISOString() }).eq("id", apiKey.id)

    return NextResponse.json({
      success: true,
      client_id: apiKey.client_id,
      permissions: apiKey.permissions,
    })
  } catch (error) {
    return NextResponse.json({ error: "Authentication failed" }, { status: 500 })
  }
}
