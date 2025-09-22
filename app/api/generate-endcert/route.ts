import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const payload = await req.json();

    const upstreamResponse = await fetch("https://localhost:7224/api/CA_Services/GenerateEndCert", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    const contentType = upstreamResponse.headers.get("content-type") || "";
    const status = upstreamResponse.status;

    if (contentType.includes("application/json")) {
      const data = await upstreamResponse.json();
      return NextResponse.json(data, { status });
    }

    const text = await upstreamResponse.text();
    return new NextResponse(text, { status });
  } catch (error: any) {
    return NextResponse.json(
      { error: error?.message || "Proxy request failed" },
      { status: 500 }
    );
  }
}



