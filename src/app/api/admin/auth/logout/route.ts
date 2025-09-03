import { NextResponse } from "next/server";
import { getAuthCookieName } from "@/lib/auth";

export async function POST() {
  const res = NextResponse.json({ ok: true });
  res.cookies.set(getAuthCookieName(), "", { httpOnly: true, path: "/", maxAge: 0 });
  return res;
}


