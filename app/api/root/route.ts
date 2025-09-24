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
      SELECT root_id,root_name,key_type,valid_from,valid_to
      FROM roots
    `)

    await db.end()

    return NextResponse.json({
      roots: rows,
      Count: (rows as any[]).length, 
    })
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}
