"use client";

import styles from "./guestbook.module.scss";
import { Button } from "../Button/Button";

type GuestbookEntry = {
    id: string;
    name: string;
    comment: string;
    timestamp: string; // ISO string or display string
};

// Static demo data; replace with real data source later
const DEMO_ENTRIES: GuestbookEntry[] = [
    { id: "1", name: "Mika", comment: "Love the vibes here! So cute ♡", timestamp: "2025-01-01 10:24" },
    { id: "2", name: "Sara", comment: "The playlist is perfect for studying!", timestamp: "2024-12-30 21:05" },
    { id: "3", name: "Yuki", comment: "Tokyo photos are amazing ✨", timestamp: "2024-12-28 14:12" },
    { id: "4", name: "Ken", comment: "Retro aesthetic on point.", timestamp: "2024-12-27 18:40" },
    { id: "5", name: "Ami", comment: "頑張ってね！応援してる〜", timestamp: "2024-12-26 08:13" },
    { id: "6", name: "Noa", comment: "Cinnamoroll is my fave too!", timestamp: "2024-12-24 23:58" },
    { id: "7", name: "Leo", comment: "Clean layout and cute colors.", timestamp: "2024-12-22 12:47" },
    { id: "8", name: "Rin", comment: "Guestbook is such a nostalgic touch!", timestamp: "2024-12-20 09:31" },
    { id: "9", name: "Aya", comment: "Love the diary entries ♡", timestamp: "2024-12-19 17:04" },
    { id: "10", name: "Hana", comment: "Can’t wait to see more posts!", timestamp: "2024-12-18 20:20" }
];

export const Guestbook = () => {
    return (
        <div className={styles.guestbookRoot}>
            <div className={styles.guestbookIntro}>
                Leave a sweet note! <span className={styles.jp}>ゲストブックにメッセージを書いてね</span> — share thoughts, compliments, or friendly hellos. Your message might make someone’s day ♡
            </div>
            <ul className={styles.guestbookList}>
                {DEMO_ENTRIES.map((entry) => (
                    <li key={entry.id} className={`${styles.guestbookItem} windowStyle`}>
                        <div className={styles.guestbookMeta}>
                            <span className={styles.guestbookName}>{entry.name}</span>
                            <span className={styles.guestbookTime}>{entry.timestamp}</span>
                        </div>
                        <p className={styles.guestbookComment}>{entry.comment}</p>
                    </li>
                ))}
            </ul>
            <div className={styles.guestbookActions}>
                <Button text="Go to guestbook" onClick={() => { /* navigate later */ }} />
            </div>
        </div>
    );
};

export default Guestbook;


