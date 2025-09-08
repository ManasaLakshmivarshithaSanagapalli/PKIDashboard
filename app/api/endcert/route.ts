// app/api/certificates/route.ts
import mysql from "mysql2/promise"
import { NextResponse } from "next/server"

export async function GET() {
  try {
    const db = await mysql.createConnection({
      host: "localhost",
      user: "root",
      password: "Dhanasri@30", // change to your DB password
      database: "ocsp_database",
    })

    // Adjust column names to match your real table structure
    const [rows] = await db.execute(`
      SELECT 
        cert_id AS id,
        subject_name,
        serial_number,
        issuer,
        status,
        issued_at,
        expires_at,
        certificate_type,
        key_algorithm,
        key_size
      FROM end_user_certificates
    `)

    await db.end()
    return NextResponse.json(rows)
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}
