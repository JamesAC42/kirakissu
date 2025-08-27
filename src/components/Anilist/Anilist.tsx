"use client";
import styles from './anilist.module.scss';
import { useEffect, useState } from 'react';
import type { AniListCollection } from '@/lib/anilist';
import { Button } from '../Button/Button';
import { Window } from '../Window/Window';
import { StickerContainer } from '../StickerContainer/StickerContainer';

type Props = { user?: string };

export default function Anilist(props: Props) {
    const user = props.user || 'yuckitsyue';
    const [collection, setCollection] = useState<AniListCollection | null>(null);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    useEffect(() => {
        let isMounted = true;
        const load = async () => {
            try {
                const res = await fetch(`/api/anilist?user=${encodeURIComponent(user)}`, { cache: 'no-store' });
                const json = await res.json();
                if (!json.ok) {
                    throw new Error(json.error || 'Request failed');
                }
                if (isMounted) setCollection(json.collection as AniListCollection);
            } catch (e: unknown) {
                if (isMounted) setErrorMessage(e instanceof Error ? e.message : 'Failed to load AniList data');
            }
        };
        load();
        return () => { isMounted = false; };
    }, [user]);

    if (errorMessage) return <div className={styles.error}>Failed to load AniList data: {errorMessage}</div>;
    if (!collection) return <div className={styles.loading}>Loading AniList…</div>;

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <Window>
                    <div className={styles.userContainer}>
                        <img src={collection.user.avatar.medium} alt="avatar" className={styles.avatar} />
                        <a href={collection.user.siteUrl} target="_blank" rel="noreferrer" className={styles.userLink}>
                            {collection.user.name}
                            <span className={styles.userId}>#{collection.user.id}</span>
                        </a>
                    </div>
                </Window>
                <div className={styles.stickerContainer}>
                    <StickerContainer blogId={new Date().toISOString().split('T')[0]} />
                </div>
            </div>
            <div className={styles.lists}>
                {collection.lists.map((list) => (
                    <div key={list.name}>
                    { list.name !== "Dropped" &&
                    <div className={styles.list} key={list.name}>
                        <div className={styles.listHeader}>
                            <h4 className={styles.listTitle}>{list.name}</h4>
                        </div>
                        <ul className={styles.entries}>
                            {list.entries.slice(0, 8).map((entry) => (
                                <li key={entry.id} className={styles.entry}>
                                    <div className={styles.entryMain}>
                                        <a href={entry.media.siteUrl} target="_blank" rel="noreferrer" className={styles.entryTitle}>
                                            {entry.media.title.english || entry.media.title.romaji || 'Untitled'}
                                        </a>
                                    </div>
                                    <div className={styles.entryMeta}>
                                        <span className={styles.badge}>{entry.status.toLowerCase()}</span>
                                        <span className={styles.badge}>ep {entry.progress}</span>
                                        {entry.score ? (<span className={`${styles.badge} ${styles.scoreBadge}`}><span className={styles.star}>⭐</span> {entry.score}</span>) : null}
                                    </div>
                                </li>
                            ))}
                            {
                                list.entries.length > 8 && (
                                    <a target="__blank" href={collection.user.siteUrl}>
                                        <Button text="View All" onClick={() => {}} />
                                    </a>
                                )
                            }
                        </ul>
                    </div>
                    }
                    </div>
                ))}
            </div>
        </div>
    );
}


