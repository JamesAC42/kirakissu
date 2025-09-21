"use client";

import localStyles from "./aboutme.module.scss";

import HeaderBox from "@/components/HeaderBox/HeaderBox";
import { PageWrapper } from "@/components/PageWrapper/PageWrapper";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import markdownStyles from "@/styles/blogpostmarkdown.module.scss";
import { useEffect, useState } from "react";
import Image from "next/image";
import profileImg from "@/assets/images/girl.png";
import taiyaki from "@/assets/images/stickers/taiyaki.png";

export default function AboutMe() {
    const [markdown, setMarkdown] = useState("");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    //

    useEffect(() => {
        (async () => {
            setLoading(true);
            setError("");
            try {
                const r = await fetch("/api/aboutme", { cache: "no-store" });
                if (!r.ok) throw new Error("Failed to load");
                const j = await r.json();
                setMarkdown(j.markdown || "");
            } catch (e) {
                setError((e as Error).message || "Failed to load");
            } finally {
                setLoading(false);
            }
        })();
    }, []);

    // no-op

    return (
        <PageWrapper>
            <HeaderBox header="About Me" subtitle2="A little bit about me and my journey." showFlashy={false} />
            <div className={localStyles.aboutWrapper}>
                <div className={`${localStyles.contentCard} ${markdownStyles.postContent}`}>
                    <Image className={localStyles.profileFloat} src={profileImg} alt="Profile" width={518} height={448} />
                    {loading && <p>Loading…</p>}
                    {error && <p>{error}</p>}
                    {!loading && !error && (
                        <div className={localStyles.markdown}>
                            <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeRaw]}>
                                {markdown}
                            </ReactMarkdown>
                        </div>
                    )}

                <Image className={localStyles.taiyaki} src={taiyaki} alt="Taiyaki" width={349} height={292} />
                </div>  
            </div>
        </PageWrapper>
    )
}