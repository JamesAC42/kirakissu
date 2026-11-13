import { NextResponse } from "next/server";
import { putPublicObject } from "@/lib/s3";

export async function POST(request: Request) {
  try {
    const contentType = request.headers.get("content-type") || "application/octet-stream";
    const url = new URL(request.url);
    const fileName = url.searchParams.get("filename") || `upload-${Date.now()}`;
    const album = (url.searchParams.get("album") || "uncategorized").replace(/[^a-z0-9-_/]/gi, "-");
    const ext = fileName.includes(".") ? fileName.split(".").pop() : undefined;
    const key = `scrapbook/${album}/${Date.now()}-${Math.random().toString(36).slice(2)}${ext ? `.${ext}` : ""}`;

    const body = Buffer.from(await request.arrayBuffer());
    return NextResponse.json(await putPublicObject(key, body, contentType));
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: (e as Error).message }, { status: 500 });
  }
}
