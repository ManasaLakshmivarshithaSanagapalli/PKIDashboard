// app/api/issuers/route.ts
import mysql from "mysql2/promise"
import { NextResponse } from "next/server"

export async function GET() {
  try {
    const db = await mysql.createConnection({
      host: "localhost",
      user: "root",
      password: "Dhanasri@30", //Db Password
      database: "ocsp_database",
    })

    const [rows] = await db.execute(`
      SELECT issuer_id, ocsp_responder_name, key_type, root_id, valid_from, valid_to
      FROM issuers
    `)

    await db.end()

    return NextResponse.json({
      issuers: rows,
      totalCount: (rows as any[]).length, // 👈 count of issuers
    })
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}
