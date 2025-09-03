import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import matter from "gray-matter";
import { promises as fs } from "fs";
import path from "path";

type BlogPost = { id: string; title: string; content: string; date: string; tags?: string[] };
type DiaryEntry = { id: string; date: string; preview: string };

async function readMarkdownDir(dir: string, limit: number): Promise<BlogPost[]> {
  try {
    const entries = await fs.readdir(dir);
    const mdFiles = entries.filter((f) => f.endsWith(".md") || f.endsWith(".mdx"));
    const parsedFiles = await Promise.all(
      mdFiles.map(async (file) => {
        const filePath = path.join(dir, file);
        const raw = await fs.readFile(filePath, "utf8");
        const parsed = matter(raw);
        const fm = parsed.data as Record<string, unknown>;
        const dateValue = fm["date"];
        const publishedAtValue = fm["published_at"];
        const dateStr =
          typeof dateValue === "string"
            ? dateValue
            : typeof publishedAtValue === "string"
              ? (publishedAtValue as string)
              : undefined;
        const date = dateStr ? new Date(dateStr) : new Date(0);
        return { file: filePath, date, parsed };
      })
    );
    parsedFiles.sort((a, b) => b.date.getTime() - a.date.getTime());
    const selected = parsedFiles.slice(0, limit);
    return selected.map(({ file, parsed }) => {
      const fm = parsed.data as Record<string, unknown>;
      return {
        id: typeof fm["slug"] === "string" ? (fm["slug"] as string) : path.basename(file),
        title: typeof fm["title"] === "string" ? (fm["title"] as string) : "",
        content: typeof fm["summary"] === "string" ? (fm["summary"] as string) : parsed.content.slice(0, 280),
        date: typeof fm["date"] === "string" ? (fm["date"] as string) : "",
        tags: Array.isArray(fm["tags"]) ? (fm["tags"] as unknown[]).filter((t): t is string => typeof t === "string") : [],
      } satisfies BlogPost;
    });
  } catch {
    return [];
  }
}

async function readDiaryDir(dir: string, limit: number): Promise<DiaryEntry[]> {
  try {
    const entries = await fs.readdir(dir);
    const mdFiles = entries.filter((f) => f.endsWith(".md") || f.endsWith(".mdx"));
    const parsedFiles = await Promise.all(
      mdFiles.map(async (file) => {
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
    parsedFiles.sort((a, b) => b.date.getTime() - a.date.getTime());
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

  const blogDir = path.join(process.cwd(), "content", "blog");
  const diaryDir = path.join(process.cwd(), "content", "diary");
  const recentPostsP = readMarkdownDir(blogDir, 4);
  const diaryEntriesP = readDiaryDir(diaryDir, 3);

  const [settings, galleryItems, poll, quiz, survey, recentPosts, diaryEntries] = await Promise.all([
    settingsP,
    galleryItemsP,
    pollP,
    quizP,
    surveyP,
    recentPostsP,
    diaryEntriesP,
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

  const popularPosts = recentPosts;

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


