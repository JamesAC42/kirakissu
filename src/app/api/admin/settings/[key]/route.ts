import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { revalidateTag } from "next/cache";

export async function GET(_: Request, ctx: { params: Promise<{ key: string }> | { key: string } }) {
  const params = await ctx.params;
  const item = await prisma.settingsKV.findUnique({ where: { key: (params as { key: string }).key } });
  if (!item) {
    return new NextResponse("Not Found", { status: 404 });
  }
  return NextResponse.json(item.value);
}

export async function PUT(request: Request, ctx: { params: Promise<{ key: string }> | { key: string } }) {
  try {
    const json = await request.json();
    const params = await ctx.params;
    await prisma.settingsKV.upsert({
      where: { key: (params as { key: string }).key },
      create: { key: (params as { key: string }).key, value: json },
      update: { value: json },
    });
    revalidateTag("homepage");
    return new NextResponse(null, { status: 204 });
  } catch (e) {
    return new NextResponse("Bad Request", { status: 400 });
  }
}


