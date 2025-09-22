import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(request: Request) {
  const url = new URL(request.url);
  const page = Math.max(1, Number(url.searchParams.get("page") || 1));
  const pageSize = Math.min(50, Math.max(1, Number(url.searchParams.get("pageSize") || 20)));
  const skip = (page - 1) * pageSize;
  const album = (url.searchParams.get("album") || "").trim();
  // Server-side tag filtering is not implemented for JSON tags; client handles tag filters.
  const where: NonNullable<Parameters<typeof prisma.scrapbookItem.findMany>[0]>["where"] = {
    ...(album ? { album } : {}),
  };

  const [total, items] = await Promise.all([
    prisma.scrapbookItem.count({ where }),
    prisma.scrapbookItem.findMany({
      where,
      orderBy: { createdAt: "desc" },
      skip,
      take: pageSize,
    }),
  ]);

  return NextResponse.json({ total, page, pageSize, items });
}


