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
    const ca_id = searchParams.get("ca_id")
    const limit = Number.parseInt(searchParams.get("limit") || "50")
    const offset = Number.parseInt(searchParams.get("offset") || "0")

    const supabase = createClient()
    let query = supabase
      .from("certificates")
      .select(`
        id,
        serial_number,
        subject_dn,
        issuer_dn,
        status,
        issued_at,
        expires_at,
        certificate_authorities(name)
      `)
      .range(offset, offset + limit - 1)

    if (status) query = query.eq("status", status)
    if (ca_id) query = query.eq("ca_id", ca_id)

    const { data: certificates, error } = await query

    if (error) {
      return NextResponse.json({ error: "Failed to fetch certificates" }, { status: 500 })
    }

    return NextResponse.json({
      certificates,
      pagination: {
        limit,
        offset,
        total: certificates?.length || 0,
      },
    })
  } catch (error) {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const authResult = await verifyApiKey(request)
    if (!authResult.success || !authResult.permissions?.includes("certificate:create")) {
      return NextResponse.json({ error: "Insufficient permissions" }, { status: 403 })
    }

    const body = await request.json()
    const { csr, ca_id, subject_dn, validity_days = 365 } = body

    if (!csr || !ca_id || !subject_dn) {
      return NextResponse.json(
        {
          error: "Missing required fields: csr, ca_id, subject_dn",
        },
        { status: 400 },
      )
    }

    const supabase = createClient()

    // Create certificate request
    const { data: certRequest, error: requestError } = await supabase
      .from("certificate_requests")
      .insert({
        ca_id,
        subject_dn,
        csr,
        status: "pending",
        requested_by: authResult.client_id,
        validity_days,
        request_type: "api",
      })
      .select()
      .single()

    if (requestError) {
      return NextResponse.json({ error: "Failed to create certificate request" }, { status: 500 })
    }

    return NextResponse.json(
      {
        request_id: certRequest.id,
        status: "pending",
        message: "Certificate request submitted successfully",
      },
      { status: 201 },
    )
  } catch (error) {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
