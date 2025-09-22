"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import styles from "./entry.module.scss";
import { PageWrapper } from "@/components/PageWrapper/PageWrapper";
// Removed Window wrapper in favor of notebook paper styling
import { Button } from "@/components/Button/Button";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import markdownStyles from "@/styles/blogpostmarkdown.module.scss";
import Image from "next/image";
import { StickerContainer } from "@/components/StickerContainer/StickerContainer";
import tape from "@/assets/images/diary/tape.png";
import cinnamoroll from "@/assets/images/stickers/cinnamoroll.png";
import applekuma from "@/assets/images/stickers/applekuma.png";

import cakeeraser from "@/assets/images/diary/cake-eraser.png";
import pen from "@/assets/images/diary/pen.png";
import scissors from "@/assets/images/diary/scissors.png";
import Link from "next/link";

type DiaryEntry = {
  title: string;
  content: string;
  publishedAt?: string | null;
  createdAt?: string | null;
};

const formatDateTime = (value?: string | null) => {
  if (!value) {
    return "";
  }
  const d = new Date(value);
  if (Number.isNaN(d.getTime())) {
    return "";
  }
  return d.toLocaleDateString('en-US', { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  });
};

export default function DiaryEntryPage() {
  const params = useParams();
  const slug = (params?.slug as string) ?? "";
  const [entry, setEntry] = useState<DiaryEntry | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!slug) {
      setError("Diary entry not found.");
      setLoading(false);
      return;
    }
    let cancelled = false;
    const fetchEntry = async () => {
      setLoading(true);
      setError("");
      const resp = await fetch(`/api/diary/${encodeURIComponent(slug)}`, { cache: "no-store" });
      if (!resp.ok) {
        if (!cancelled) {
          setError(resp.status === 404 ? "Diary entry not found." : "Unable to load diary entry.");
          setEntry(null);
        }
        setLoading(false);
        return;
      }
      const data = await resp.json();
      if (cancelled) {
        return;
      }
      setEntry({
        title: (data.title as string) ?? "",
        content: (data.content as string) ?? "",
        publishedAt: data.publishedAt ? String(data.publishedAt) : null,
        createdAt: data.createdAt ? String(data.createdAt) : null,
      });
      setLoading(false);
    };
    fetchEntry();
    return () => {
      cancelled = true;
    };
  }, [slug]);

  return (
    <PageWrapper>
      <div className={styles.entryPage}>
        <div className={styles.backRow}>
          <Link href="/diary" className={styles.backLink}>
            <Button text="Back to diary" small />
          </Link>
        </div>
        <div className={styles.notebookContainer}>
          <div className={styles.notebookPaperContainer}>
            <div className={styles.notebookPaper}>
              <div className={styles.paperHole}></div>
              <div className={styles.paperHole}></div>
              <div className={styles.paperHole}></div>
              <Image className={styles.tapeTop} src={tape} alt="tape" width={423} height={163} />
              <Image className={styles.tapeBottom} src={tape} alt="tape" width={423} height={163} />
              {loading && <p className={markdownStyles.postContent}>Loading...</p>}
              {!loading && error && <p className={markdownStyles.postContent}>{error}</p>}
              {!loading && !error && entry && (
                <>
                  <div className={styles.entryHeader}>
                    <h1 className={styles.entryTitle}>{entry.title}</h1>
                    <div className={styles.entryMeta}>
                      <span className={styles.metaItem}>
                        {formatDateTime(entry.publishedAt ?? entry.createdAt)}
                      </span>
                    </div>
                  </div>
                  <div className={styles.diaryGreeting}>Dear Diary,</div>
                  <div className={`${markdownStyles.postContent} ${styles.notebookContent}`}>
                    <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeRaw]}>
                      {entry.content}
                    </ReactMarkdown>
                  </div>
                  <div className={styles.signature}>— KiraKissu</div>
                  <div className={styles.stickerWrap} aria-hidden>
                    <StickerContainer blogId={slug} />
                  </div>
                </>
              )}
            </div>
          </div>
          <div className={styles.stationaryContainer}>
            <Image className={styles.cakeeraser} src={cakeeraser} alt="cake eraser" width={234} height={212} />
            <Image className={styles.pen} src={pen} alt="pen" width={395} height={632} />
            <Image className={styles.scissors} src={scissors} alt="scissors" width={191} height={480} />
            <Image className={styles.cinnamoroll} src={cinnamoroll} alt="cinnamoroll" width={273} height={302} />
            <Image className={styles.applekuma} src={applekuma} alt="applekuma" width={248} height={269} />
          </div>
        </div>
      </div>
    </PageWrapper>
  );
}
