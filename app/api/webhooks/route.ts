import { type NextRequest, NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/server"
import { verifyApiKey } from "@/lib/api/auth"

export async function POST(request: NextRequest) {
  try {
    const authResult = await verifyApiKey(request)
    if (!authResult.success) {
      return NextResponse.json({ error: authResult.error }, { status: 401 })
    }

    const body = await request.json()
    const { url, events, secret } = body

    if (!url || !events || !Array.isArray(events)) {
      return NextResponse.json(
        {
          error: "Missing required fields: url, events (array)",
        },
        { status: 400 },
      )
    }

    const supabase = createClient()
    const { data: webhook, error } = await supabase
      .from("webhooks")
      .insert({
        client_id: authResult.client_id,
        url,
        events,
        secret,
        is_active: true,
      })
      .select()
      .single()

    if (error) {
      return NextResponse.json({ error: "Failed to create webhook" }, { status: 500 })
    }

    return NextResponse.json({ webhook }, { status: 201 })
  } catch (error) {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function GET(request: NextRequest) {
  try {
    const authResult = await verifyApiKey(request)
    if (!authResult.success) {
      return NextResponse.json({ error: authResult.error }, { status: 401 })
    }

    const supabase = createClient()
    const { data: webhooks, error } = await supabase.from("webhooks").select("*").eq("client_id", authResult.client_id)

    if (error) {
      return NextResponse.json({ error: "Failed to fetch webhooks" }, { status: 500 })
    }

    return NextResponse.json({ webhooks })
  } catch (error) {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
