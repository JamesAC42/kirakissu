import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { verifyTurnstile } from "@/lib/auth";

export async function GET(request: Request) {
  const url = new URL(request.url);
  const page = Math.max(1, Number(url.searchParams.get("page") || 1));
  const pageSize = Math.min(50, Math.max(1, Number(url.searchParams.get("pageSize") || 10)));
  const skip = (page - 1) * pageSize;
  const items = await prisma.guestbookEntry.findMany({
    where: { isApproved: true },
    orderBy: { createdAt: "desc" },
    skip,
    take: pageSize,
  });
  return NextResponse.json({ items, page, pageSize });
}

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  if (!body) return new NextResponse("Bad Request", { status: 400 });
  const { name, message, email, turnstileToken } = body as { name?: string; message?: string; email?: string; turnstileToken?: string };
  if (!name || !message || !turnstileToken) return new NextResponse("Bad Request", { status: 400 });

  const ip = (request.headers.get("x-forwarded-for") ?? "").split(",")[0] || undefined;
  const captchaOk = await verifyTurnstile(turnstileToken, ip);
  if (!captchaOk) return new NextResponse("Captcha failed", { status: 400 });

  await prisma.guestbookEntry.create({ data: { name, message, email: email ?? null, isApproved: false, ipHash: ip ?? "" } });
  return NextResponse.json({ ok: true });
}


