import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { revalidateTag } from "next/cache";

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  const body = await request.json().catch(() => null);
  if (!body) return new NextResponse("Bad Request", { status: 400 });
  const { isApproved } = body as { isApproved?: boolean };
  if (typeof isApproved !== "boolean") return new NextResponse("Bad Request", { status: 400 });
  await prisma.guestbookEntry.update({ where: { id: params.id }, data: { isApproved } });
  revalidateTag("guestbook");
  return new NextResponse(null, { status: 204 });
}


