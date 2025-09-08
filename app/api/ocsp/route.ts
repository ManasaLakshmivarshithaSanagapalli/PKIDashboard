import { type NextRequest, NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/server"

// OCSP Request handler
export async function POST(request: NextRequest) {
  try {
    const contentType = request.headers.get("content-type")

    // Handle OCSP request (typically application/ocsp-request)
    if (contentType === "application/ocsp-request") {
      const requestData = await request.arrayBuffer()

      // Parse OCSP request (in real implementation, use ASN.1 parser)
      const ocspResponse = await processOCSPRequest(new Uint8Array(requestData))

      return new NextResponse(ocspResponse, {
        status: 200,
        headers: {
          "Content-Type": "application/ocsp-response",
          "Cache-Control": "max-age=3600", // Cache for 1 hour
        },
      })
    }

    return NextResponse.json({ error: "Invalid content type" }, { status: 400 })
  } catch (error) {
    console.error("OCSP request processing error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

// GET handler for OCSP requests via URL parameters
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const serialNumber = searchParams.get("serial")
    const issuerHash = searchParams.get("issuer")

    if (!serialNumber || !issuerHash) {
      return NextResponse.json({ error: "Missing required parameters" }, { status: 400 })
    }

    const supabase = createClient()

    // Query certificate status from database
    const { data: certificate, error } = await supabase
      .from("certificates")
      .select("status, revoked_at, revocation_reason")
      .eq("serial_number", serialNumber)
      .single()

    if (error) {
      return NextResponse.json({ error: "Certificate not found" }, { status: 404 })
    }

    const response = {
      serialNumber,
      status: certificate.status === "revoked" ? "revoked" : "good",
      thisUpdate: new Date().toISOString(),
      nextUpdate: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(), // 24 hours
      revocationTime: certificate.revoked_at,
      revocationReason: certificate.revocation_reason,
    }

    return NextResponse.json(response)
  } catch (error) {
    console.error("OCSP GET request error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

async function processOCSPRequest(requestData: Uint8Array): Promise<Uint8Array> {
  // Mock OCSP response generation
  // In real implementation, this would:
  // 1. Parse the ASN.1 OCSP request
  // 2. Extract certificate serial number and issuer
  // 3. Query database for certificate status
  // 4. Generate signed OCSP response

  const mockResponse = new Uint8Array([
    0x30,
    0x82,
    0x01,
    0x23, // SEQUENCE
    // ... OCSP response structure would go here
  ])

  return mockResponse
}
