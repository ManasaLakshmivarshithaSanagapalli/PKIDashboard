import { type NextRequest, NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/server"
import { verifyApiKey } from "@/lib/api/auth"

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const authResult = await verifyApiKey(request)
    if (!authResult.success) {
      return NextResponse.json({ error: authResult.error }, { status: 401 })
    }

    const supabase = createClient()
    const { data: certificate, error } = await supabase
      .from("certificates")
      .select(`
        *,
        certificate_authorities(name, type),
        certificate_requests(requested_by, requested_at)
      `)
      .eq("id", params.id)
      .single()

    if (error || !certificate) {
      return NextResponse.json({ error: "Certificate not found" }, { status: 404 })
    }

    return NextResponse.json({ certificate })
  } catch (error) {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const authResult = await verifyApiKey(request)
    if (!authResult.success || !authResult.permissions?.includes("certificate:revoke")) {
      return NextResponse.json({ error: "Insufficient permissions" }, { status: 403 })
    }

    const body = await request.json()
    const { reason = "unspecified" } = body

    const supabase = createClient()

    // Revoke certificate
    const { error } = await supabase
      .from("certificates")
      .update({
        status: "revoked",
        revoked_at: new Date().toISOString(),
        revocation_reason: reason,
      })
      .eq("id", params.id)

    if (error) {
      return NextResponse.json({ error: "Failed to revoke certificate" }, { status: 500 })
    }

    return NextResponse.json({
      message: "Certificate revoked successfully",
      revoked_at: new Date().toISOString(),
      reason,
    })
  } catch (error) {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
