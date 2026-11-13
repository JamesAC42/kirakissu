import { NextResponse } from "next/server";
import { putPublicObject } from "@/lib/s3";

export async function POST(request: Request) {
  try {
    const contentType = request.headers.get("content-type") || "application/octet-stream";
    const fileName = (new URL(request.url)).searchParams.get("filename") || `upload-${Date.now()}`;
    const ext = fileName.includes(".") ? fileName.split(".").pop() : undefined;
    const key = `blog/${Date.now()}-${Math.random().toString(36).slice(2)}${ext ? `.${ext}` : ""}`;

    const body = Buffer.from(await request.arrayBuffer());
    return NextResponse.json(await putPublicObject(key, body, contentType));
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: (e as Error).message }, { status: 500 });
  }
}
