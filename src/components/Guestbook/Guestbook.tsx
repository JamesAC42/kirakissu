"use client";

import styles from "./guestbook.module.scss";
import { Button } from "../Button/Button";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

type GuestbookPreviewItem = {
    id: string;
    name: string;
    message: string;
    createdAt: string;
};

export const Guestbook = () => {
    const router = useRouter();
    const [items, setItems] = useState<GuestbookPreviewItem[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        (async () => {
            try {
                setLoading(true);
                const r = await fetch(`/api/guestbook?page=1&pageSize=20&_=${Date.now()}`, { cache: "no-store" });
                if (!r.ok) { setLoading(false); return; }
                const j: { items?: Array<{ id: string; name: string; message: string; createdAt: string }> } = await r.json();
                setItems((j.items || []).map(x => ({ id: x.id, name: x.name, message: x.message, createdAt: x.createdAt })));
            } catch {
            } finally {
                setLoading(false);
            }
        })();
    }, []);

    return (
        <div className={styles.guestbookRoot}>
            <div className={styles.guestbookIntro}>
                Leave a sweet note! <span className={styles.jp}>ゲストブックにメッセージを書いてね</span> — share thoughts, compliments, or friendly hellos. Your message might make someone’s day ♡
            </div>
            <ul className={styles.guestbookList}>
                {loading && <li>Loading…</li>}
                {!loading && items.map((entry) => (
                    <li key={entry.id} className={`${styles.guestbookItem} windowStyle`}>
                        <div className={styles.guestbookMeta}>
                            <span className={styles.guestbookName}>{entry.name}</span>
                            <span className={styles.guestbookTime}>{new Date(entry.createdAt).toLocaleString()}</span>
                        </div>
                        <p className={styles.guestbookComment}>{entry.message.length > 160 ? entry.message.slice(0, 157) + "…" : entry.message}</p>
                    </li>
                ))}
            </ul>
            <div className={styles.guestbookActions}>
                <Button text="Go to guestbook" onClick={() => router.push("/guestbook")} />
            </div>
        </div>
    );
};

export default Guestbook;


