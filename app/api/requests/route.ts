import { type NextRequest, NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/server"
import { verifyApiKey } from "@/lib/api/auth"

export async function GET(request: NextRequest) {
  try {
    const authResult = await verifyApiKey(request)
    if (!authResult.success) {
      return NextResponse.json({ error: authResult.error }, { status: 401 })
    }

    const { searchParams } = new URL(request.url)
    const status = searchParams.get("status")
    const limit = Number.parseInt(searchParams.get("limit") || "50")
    const offset = Number.parseInt(searchParams.get("offset") || "0")

    const supabase = createClient()
    let query = supabase
      .from("certificate_requests")
      .select(`
        id,
        subject_dn,
        status,
        requested_at,
        processed_at,
        certificate_authorities(name)
      `)
      .eq("requested_by", authResult.client_id)
      .range(offset, offset + limit - 1)
      .order("requested_at", { ascending: false })

    if (status) query = query.eq("status", status)

    const { data: requests, error } = await query

    if (error) {
      return NextResponse.json({ error: "Failed to fetch requests" }, { status: 500 })
    }

    return NextResponse.json({
      requests,
      pagination: { limit, offset, total: requests?.length || 0 },
    })
  } catch (error) {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
