import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import matter from "gray-matter";
import { promises as fs } from "fs";
import path from "path";
type BlogPost = { id: string; title: string; content: string; date: string; tags?: string[] };
type DiaryEntry = { id: string; date: string; preview: string };

async function readDiaryDir(dir: string, limit: number): Promise<DiaryEntry[]> {
  try {
    const entries = await fs.readdir(dir);
    const mdFiles = entries.filter((f: string) => f.endsWith(".md") || f.endsWith(".mdx"));
    const parsedFiles = await Promise.all(
      mdFiles.map(async (file: string) => {
        const filePath = path.join(dir, file);
        const raw = await fs.readFile(filePath, "utf8");
        const parsed = matter(raw);
        const fm = parsed.data as Record<string, unknown>;
        const dateStr = typeof fm["date"] === "string" ? (fm["date"] as string) : path.basename(file, path.extname(file));
        const date = dateStr ? new Date(dateStr) : new Date(0);
        const preview = parsed.content.trim().slice(0, 280);
        return { file: filePath, date, dateStr, preview };
      })
    );
    parsedFiles.sort((a: { date: Date }, b: { date: Date }) => b.date.getTime() - a.date.getTime());
    return parsedFiles.slice(0, limit).map((p) => ({ id: p.dateStr, date: p.dateStr, preview: p.preview }));
  } catch {
    return [];
  }
}

export async function GET() {
  const nowIso = new Date().toISOString().slice(0, 10);

  const keys = ["profile", "status", "faq", "favorites", "todo"] as const;
  const settingsP = prisma.settingsKV.findMany({ where: { key: { in: keys as unknown as string[] } } });
  const galleryItemsP = prisma.scrapbookItem.findMany({ orderBy: { createdAt: "desc" }, take: 12 });
  const now = new Date();
  const pollP = prisma.poll.findFirst({
    where: {
      OR: [
        { AND: [{ activeFrom: { lte: now } }, { activeTo: null }] },
        { AND: [{ activeFrom: { lte: now } }, { activeTo: { gte: now } }] },
      ],
    },
    orderBy: { activeFrom: "desc" },
    include: { options: { orderBy: { sort: "asc" } } },
  });
  const quizP = prisma.quiz.findFirst({ where: { active: true }, include: { options: { orderBy: { sort: "asc" } } } });
  const surveyP = prisma.survey.findFirst({ where: { active: true }, include: { options: { orderBy: { sort: "asc" } } } });

  const diaryDir = path.join(process.cwd(), "content", "diary");
  const recentPostsP = (async () => {
    const posts = await prisma.blogPost.findMany({
      where: { status: "PUBLISHED" },
      orderBy: [{ publishedAt: "desc" }, { createdAt: "desc" }],
      take: 4,
      select: { slug: true, title: true, excerpt: true, tags: true, publishedAt: true },
    });
    return posts.map((p) => ({
      id: p.slug,
      title: p.title,
      content: (p.excerpt ?? ""),
      date: p.publishedAt ? new Date(p.publishedAt).toISOString().slice(0, 10) : "",
      tags: (p.tags ?? []).map(t => t),
    } satisfies BlogPost));
  })();
  const diaryEntriesP = readDiaryDir(diaryDir, 3);

  const popularPostsP = (async () => {
    const posts = await prisma.blogPost.findMany({
      where: { status: "PUBLISHED" },
      orderBy: [{ views: "desc" }, { isFeatured: "desc" }, { publishedAt: "desc" }],
      take: 4,
      select: { slug: true, title: true, excerpt: true, tags: true, publishedAt: true },
    });
    return posts.map((p) => ({
      id: p.slug,
      title: p.title,
      content: (p.excerpt ?? ""),
      date: p.publishedAt ? new Date(p.publishedAt).toISOString().slice(0, 10) : "",
      tags: (p.tags ?? []).map(t => t),
    } satisfies BlogPost));
  })();

  const [settings, galleryItems, poll, quiz, survey, recentPosts, diaryEntries, popularPosts] = await Promise.all([
    settingsP,
    galleryItemsP,
    pollP,
    quizP,
    surveyP,
    recentPostsP,
    diaryEntriesP,
    popularPostsP,
  ]);

  const kv: Record<(typeof keys)[number], unknown> = {
    profile: undefined,
    status: undefined,
    faq: undefined,
    favorites: undefined,
    todo: undefined,
  };
  for (const s of settings) {
    const key = s.key as (typeof keys)[number];
    kv[key] = s.value as unknown;
  }

  const gallery = {
    images: galleryItems.map((g: { imageUrl: string; caption: string }) => ({ src: g.imageUrl, alt: g.caption, caption: g.caption })),
  };

  const pollPayload = poll
    ? { poll: { question: poll.question, options: poll.options.map((o: { id: string; label: string }) => ({ id: o.id, label: o.label })) } }
    : { poll: null };

  const quizPayload = quiz
    ? (() => {
        const opts = quiz.options.map((o: { id: string; label: string }) => ({ id: o.id, label: o.label }));
        const exists = quiz.correctOptionId && quiz.options.some((o: { id: string }) => o.id === quiz.correctOptionId);
        const correctId = exists ? (quiz.correctOptionId as string) : (opts[0]?.id ?? "");
        return {
          question: quiz.question,
          options: opts,
          correctAnswerId: correctId,
        };
      })()
    : null;

  const surveyPayload = survey
    ? { question: survey.question, choices: survey.options.map((o: { id: string; label: string }) => ({ id: o.id, label: o.label })) }
    : null;

  // Popular posts fetched from database

  const payload = {
    lastUpdated: nowIso,
    profile: kv["profile"] ?? {},
    status: kv["status"] ?? {},
    faq: kv["faq"] ?? { faqs: [] },
    gallery,
    favorites: kv["favorites"] ?? { favorites: [] },
    poll: pollPayload,
    todo: kv["todo"] ?? { todos: [] },
    blog: { recentPosts, popularPosts },
    diary: { entries: diaryEntries },
    quiz: quizPayload,
    survey: surveyPayload,
  };

  return NextResponse.json(payload);
}


