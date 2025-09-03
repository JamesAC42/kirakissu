import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { revalidateTag } from "next/cache";

export async function GET(_: Request, { params }: { params: { key: string } }) {
  const item = await prisma.settingsKV.findUnique({ where: { key: params.key } });
  if (!item) {
    return new NextResponse("Not Found", { status: 404 });
  }
  return NextResponse.json(item.value);
}

export async function PUT(request: Request, { params }: { params: { key: string } }) {
  try {
    const json = await request.json();
    await prisma.settingsKV.upsert({
      where: { key: params.key },
      create: { key: params.key, value: json },
      update: { value: json },
    });
    revalidateTag("homepage");
    return new NextResponse(null, { status: 204 });
  } catch (e) {
    return new NextResponse("Bad Request", { status: 400 });
  }
}


