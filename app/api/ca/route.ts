import { type NextRequest, NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/server"
import { verifyApiKey } from "@/lib/api/auth"

export async function GET(request: NextRequest) {
  try {
    const authResult = await verifyApiKey(request)
    if (!authResult.success) {
      return NextResponse.json({ error: authResult.error }, { status: 401 })
    }

    const supabase = createClient()
    const { data: cas, error } = await supabase
      .from("certificate_authorities")
      .select(`
        id,
        name,
        type,
        status,
        subject_dn,
        created_at,
        expires_at
      `)
      .eq("status", "active")

    if (error) {
      return NextResponse.json({ error: "Failed to fetch CAs" }, { status: 500 })
    }

    return NextResponse.json({ certificate_authorities: cas })
  } catch (error) {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
