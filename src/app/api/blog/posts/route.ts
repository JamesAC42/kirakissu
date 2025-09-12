import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

type SortOption = "newest" | "oldest" | "popular" | "liked";

export async function GET(request: Request) {
  const url = new URL(request.url);
  const search = (url.searchParams.get("search") ?? "").trim();
  const tagsParam = url.searchParams.get("tags") ?? ""; // comma-separated
  const tagMode = (url.searchParams.get("tagMode") ?? "any").toLowerCase(); // any|all
  const sort = (url.searchParams.get("sort") ?? "newest").toLowerCase() as SortOption;
  const featuredParam = url.searchParams.get("featured");
  const featuredOnly = featuredParam === "1" || featuredParam === "true";
  const page = Math.max(1, Number(url.searchParams.get("page") || 1));
  const pageSize = Math.min(50, Math.max(1, Number(url.searchParams.get("pageSize") || 10)));
  const skip = (page - 1) * pageSize;

  const tags = tagsParam
    .split(",")
    .map((t) => t.trim())
    .filter(Boolean);

  const where: Parameters<typeof prisma.blogPost.findMany>[0]["where"] = {
    status: "PUBLISHED",
    ...(featuredOnly ? { isFeatured: true } : {}),
    ...(search
      ? {
          OR: [
            { title: { contains: search, mode: "insensitive" } },
            { excerpt: { contains: search, mode: "insensitive" } },
          ],
        }
      : {}),
    ...(tags.length
      ? tagMode === "all"
        ? { tags: { hasEvery: tags.map(t => t.toLowerCase()) } }
        : { tags: { hasSome: tags.map(t => t.toLowerCase()) } }
      : {}),
  };

  const orderBy: Parameters<typeof prisma.blogPost.findMany>[0]["orderBy"] =
    sort === "oldest"
      ? [{ publishedAt: "asc" }, { createdAt: "asc" }]
      : sort === "popular"
        ? [{ views: "desc" }, { isFeatured: "desc" }, { publishedAt: "desc" }, { createdAt: "desc" }]
        : sort === "liked"
          ? [{ likes: "desc" }, { isFeatured: "desc" }, { publishedAt: "desc" }, { createdAt: "desc" }]
          : [{ publishedAt: "desc" }, { createdAt: "desc" }];

  const [total, items] = await Promise.all([
    prisma.blogPost.count({ where }),
    prisma.blogPost.findMany({
      where,
      orderBy,
      skip,
      take: pageSize,
      select: {
        id: true,
        slug: true,
        title: true,
        excerpt: true,
        tags: true,
        coverImage: true,
        publishedAt: true,
        isFeatured: true,
        views: true,
        likes: true,
      },
    }),
  ]);

  return NextResponse.json({ total, page, pageSize, items });
}


