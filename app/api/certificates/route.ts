import mysql from "mysql2/promise"
import { NextResponse } from "next/server"
import forge from "node-forge"

export async function GET(req: Request) {
  try {
    const db = await mysql.createConnection({
      host: "localhost",
      user: "root",
      password: "Dhanasri@30",
      database: "ocsp_database",
    })

    const url = new URL(req.url)
    const statusFilter = url.searchParams.get("status")
    const issuerFilter = url.searchParams.get("issuer_id")
    const limit = parseInt(url.searchParams.get("limit") || "50")
    const offset = parseInt(url.searchParams.get("offset") || "0")

    let query = `
      SELECT 
        e.cert_id,
        e.issuer_id,
        e.serial_number,
        e.subject_name,
        i.issuer_name,
        e.certificate_pem,
        e.key_type,
        e.status,
        e.created_at,
        e.updated_at,
        e.revocation_date,
        e.revocation_reason
      FROM end_user_certificates e
      JOIN issuers i ON e.issuer_id = i.issuer_id
      WHERE 1=1
    `
    const params: any[] = []

    if (statusFilter) {
      query += " AND e.status = ?"
      params.push(statusFilter)
    }

    if (issuerFilter) {
      query += " AND e.issuer_id = ?"
      params.push(issuerFilter)
    }

    query += ` ORDER BY e.created_at DESC LIMIT ${limit} OFFSET ${offset}`

    const [rows] = await db.execute(query, params)
    await db.end()

    // Parse PEMs and extract CN robustly
    const parsedCertificates = (rows as any[]).map((row) => {
      let subjectCN: string | null = null
      let issuerCN: string | null = null

      // 1️⃣ Try parsing PEM
      try {
        if (row.certificate_pem) {
          const cert = forge.pki.certificateFromPem(row.certificate_pem)
          subjectCN = cert.subject.getField("CN")?.value || null
          issuerCN = cert.issuer.getField("CN")?.value || null
        }
      } catch {
        
      }

      // 2️⃣ Fallback to DB subject_name
       if (!subjectCN && row.subject_name) {
  const cnMatch = row.subject_name.match(/CN=([^,\/\s]+)/);
  if (cnMatch) {
    subjectCN = cnMatch[1].trim();
  } else {
    const fallback = row.subject_name.match(/^(.*?)\s*(?=O=|C=|,|$)/);
    if (fallback) subjectCN = fallback[1].trim();
  }
}


      // 3️⃣ Fallback to DB issuer_name
      if (!issuerCN && row.issuer_name) {
        const cnMatch = row.issuer_name.match(/CN=([^,\/]+)/)
        if (cnMatch) {
          issuerCN = cnMatch[1].trim()
        } else {
          const fallback = row.issuer_name.match(/^(.*?)\s*(O=|C=|$)/)
          if (fallback) issuerCN = fallback[1].trim()
        }
      }

      return {
        ...row,
        parsed: {
          subjectCN,
          issuerCN,
          serialNumber: row.serial_number,
          validFrom: row.created_at,
          validTo: row.updated_at,
          publicKeyAlgorithm: row.key_type,
        },
      }
    })

    return NextResponse.json({
      certificates: parsedCertificates,
      pagination: { limit, offset, count: parsedCertificates.length },
    })
  } catch (err: any) {
    console.error("API /certificates error:", err)
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}
