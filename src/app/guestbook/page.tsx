"use client";

import HeaderBox from "@/components/HeaderBox/HeaderBox";
import { PageWrapper } from "@/components/PageWrapper/PageWrapper";
import { useEffect, useRef, useState, useMemo } from "react";
import { Button } from "@/components/Button/Button";
import { Turnstile } from "@marsidev/react-turnstile";
import styles from "./guestbook.module.scss";
import { Window } from "@/components/Window/Window";
import { computeTilt } from "@/utilities/computeTilt";

const colors = ["#e0e6ff", "#c9ffe4", "#fffcbf", "#efe1ff", "#ffe5f0", "#ffe9d7", "#d9d3ff", "#ffd8d8"];

export default function Guestbook() {
    const [items, setItems] = useState<Array<{ id: string; name: string; message: string; createdAt: string; isAdmin?: boolean; replies?: Array<{ id: string; name: string; message: string; createdAt: string; isAdmin?: boolean }> }>>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string>("");
    const [isAdmin, setIsAdmin] = useState(false);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");
    const [captchaToken, setCaptchaToken] = useState("");
    const [submitting, setSubmitting] = useState(false);
    const textareaRef = useRef<HTMLTextAreaElement | null>(null);

    useEffect(() => {
        (async () => {
            setLoading(true);
            setError("");
            try {
                const r = await fetch(`/api/guestbook?page=1&pageSize=50&_=${Date.now()}`, { cache: "no-store" });
                if (!r.ok) throw new Error("Failed to load guestbook");
                const j: { items?: Array<{ id: string; name: string; message: string; createdAt: string; isAdmin?: boolean; replies?: Array<{ id: string; name: string; message: string; createdAt: string; isAdmin?: boolean }> }>; isAdmin?: boolean } = await r.json();
                setItems((j.items || []).map((x) => ({
                    id: x.id,
                    name: x.name,
                    message: x.message,
                    createdAt: x.createdAt,
                    isAdmin: x.isAdmin,
                    replies: (x.replies || []).map((r) => ({
                        id: r.id,
                        name: r.name,
                        message: r.message,
                        createdAt: r.createdAt,
                        isAdmin: r.isAdmin,
                    })),
                })));
                setIsAdmin(!!j.isAdmin);
            } catch (e) {
                setError((e as Error).message || "Failed to load");
            } finally {
                setLoading(false);
            }
        })();
    }, []);

    const reload = async () => {
        const r = await fetch(`/api/guestbook?page=1&pageSize=50&_=${Date.now()}`, { cache: "no-store" });
        if (!r.ok) return;
        const j: { items?: Array<{ id: string; name: string; message: string; createdAt: string; isAdmin?: boolean; replies?: Array<{ id: string; name: string; message: string; createdAt: string; isAdmin?: boolean }> }>; isAdmin?: boolean } = await r.json();
        setItems((j.items || []).map((x) => ({
            id: x.id,
            name: x.name,
            message: x.message,
            createdAt: x.createdAt,
            isAdmin: x.isAdmin,
            replies: (x.replies || []).map((r) => ({
                id: r.id,
                name: r.name,
                message: r.message,
                createdAt: r.createdAt,
                isAdmin: r.isAdmin,
            })),
        })));
        setIsAdmin(!!j.isAdmin);
    };

    const reply = async (id: string) => {
        const reply = prompt("Reply:") || "";
        if (!reply.trim()) return;
        await fetch(`/api/guestbook`, { 
            method: "POST", 
            headers: { 
                "Content-Type": "application/json"
            }, 
            body: JSON.stringify({ 
                name: "Admin", 
                email: "", 
                message: reply.slice(0, 2000), 
                parentId: id, 
                turnstileToken: "dummy" 
            }) 
        });
        await reload();
    }

    function computeTiltClass(item: { createdAt: string }): string {
        const key = new Date(item.createdAt).toLocaleString();
        const n = computeTilt(key);
        return `tilt${n}`;
    }

    const colorList = useMemo(() => {
        return [...colors].sort(() => Math.random() - 0.5);
    }, [])

    return (
        <PageWrapper>
            <HeaderBox header="Guestbook" subtitle2="Leave a sweet note!" showFlashy={false}>
            </HeaderBox>
            <div className={styles.guestbookRoot}>
                {loading && <p>Loading…</p>}
                {error && <p>{error}</p>}
                {!loading && !error && (
                    <div className={styles.listContainer}>
                        {items.map((it, index) => (
                            <div 
                                key={it.id} 
                                className={`${styles.guestbookItem} ${styles[computeTiltClass(it)]}`}
                                style={{ background: colorList[index % colorList.length] }}
                                >
                                <div className={styles.stickyTop}></div>
                                <div className={styles.stickyContent}>
                                    <div className={styles.itemHeader}>
                                        <div className={styles.itemName}>{it.isAdmin ? "Admin" : it.name}</div>
                                        <div className={styles.itemTime}>{new Date(it.createdAt).toLocaleString()}</div>
                                    </div>
                                    <div className={styles.itemMessage}>{it.message}</div>
                                    {it.replies?.map((r) => (
                                        <div key={r.id} className={`${styles.reply} ${styles.guestbookItem}]}`}>
                                            <div className={styles.stickyTop}></div>
                                            <div className={styles.stickyContent}>
                                                <div className={styles.replyHeader}>
                                                    <div className={styles.replyName}>{r.isAdmin ? "Admin" : r.name}</div>
                                                    <div className={styles.replyTime}>{new Date(r.createdAt).toLocaleString()}</div>
                                                </div>
                                                <div className={styles.itemMessage}>{r.message}</div>
                                            </div>
                                        </div>
                                    ))}
                                    {isAdmin && (
                                        <div className={styles.replyActions}>
                                            <div className={styles.replyButton} onClick={() => reply(it.id)}>Reply</div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                )}
                <Window>
                    <div className={styles.formInner}>
                        <h3>Leave a message!</h3>
                        <label>Name</label>
                        <input type="text" value={name} onChange={(e) => setName(e.target.value.slice(0, 64))} />
                        <label>Email (optional, only visible to admin)</label>
                        <input type="email" value={email} onChange={(e) => setEmail(e.target.value.slice(0, 200))} />
                        <label>Message</label>
                        <div className={styles.guestbookItem}>
                        <div className={styles.stickyTop}></div>
                        <div className={styles.stickyContent}>
                            <textarea ref={textareaRef} placeholder="Leave a message..." value={message} onChange={(e) => setMessage(e.target.value.slice(0, 2000))} />
                        </div>
                        </div>
                        <div className={styles.actionsRow}>
                            <Turnstile siteKey={process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY as string} onSuccess={(t) => setCaptchaToken(t)} />
                            <Button text="Submit" disabled={submitting || (!isAdmin && !captchaToken)} onClick={async () => {
                                if (!name.trim() || !message.trim()) { alert("Please enter your name and a message"); return; }
                                setSubmitting(true);
                                try {
                                    const r = await fetch(`/api/guestbook`, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ name: name.trim(), email: email.trim(), message: message.trim(), turnstileToken: captchaToken }) });
                                    if (r.status === 429) { alert("You're sending messages too fast. Please wait a moment."); return; }
                                    if (!r.ok) { alert("Failed to submit"); return; }
                                    setName(""); setEmail(""); setMessage(""); setCaptchaToken("");
                                    await reload();
                                } finally { setSubmitting(false); }
                            }} />
                        </div>
                    </div>
                </Window>
            </div>
        </PageWrapper>
    )
}