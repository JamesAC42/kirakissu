"use client";

import HeaderBox from "@/components/HeaderBox/HeaderBox";
import { PageWrapper } from "@/components/PageWrapper/PageWrapper";
import { useEffect, useMemo, useState } from "react";
import { Window } from "@/components/Window/Window";

export default function Scrapbook() {
    const [items, setItems] = useState<Array<{ id: string; imageUrl: string; caption: string; takenAt?: string | null; album?: string | null; tags?: string[] }>>([]);
    const [album, setAlbum] = useState<string>("");
    const [tagFilter, setTagFilter] = useState<string>("");
    const [page, setPage] = useState<number>(1);
    const [total, setTotal] = useState<number>(0);

    useEffect(() => {
        (async () => {
            // If tag filter is active, ignore album and paginate across entire table client-side
            if (tagFilter.trim()) {
                const params = new URLSearchParams();
                params.set("page", "1");
                params.set("pageSize", String(2000));
                const r = await fetch(`/api/scrapbook?${params.toString()}`, { cache: "no-store" });
                if (r.ok) {
                    const j = await r.json();
                    const tags = tagFilter.split(",").map(t => t.trim().toLowerCase()).filter(Boolean);
                    const filtered = (j.items || []).filter((it: any) => {
                        const its = Array.isArray(it.tags) ? (it.tags as string[]).map(s => s.toLowerCase()) : [];
                        // any-match
                        return tags.length === 0 ? true : tags.some(t => its.includes(t));
                    });
                    const start = (page - 1) * 12;
                    const end = start + 12;
                    setItems(filtered.slice(start, end));
                    setTotal(filtered.length);
                }
                return;
            }

            // Album mode: if album selected, paginate; else fetch all (first page size is 100 to get enough per album)
            if (album) {
                const params = new URLSearchParams();
                params.set("album", album);
                params.set("page", String(page));
                params.set("pageSize", String(12));
                const r = await fetch(`/api/scrapbook?${params.toString()}`, { cache: "no-store" });
                if (r.ok) { const j = await r.json(); setItems(j.items || []); setTotal(j.total || 0); }
            } else {
                const params = new URLSearchParams();
                params.set("page", "1");
                params.set("pageSize", "200");
                const r = await fetch(`/api/scrapbook?${params.toString()}`, { cache: "no-store" });
                if (r.ok) {
                    const j = await r.json();
                    setItems(j.items || []);
                    setTotal(j.total || 0);
                }
            }
        })();
    }, [album, tagFilter, page]);

    const groups = useMemo(() => {
        const byAlbum: Record<string, typeof items> = {};
        for (const it of items) {
            const key = (it.album || "uncategorized").toLowerCase();
            byAlbum[key] = byAlbum[key] || [];
            byAlbum[key].push(it);
        }
        return byAlbum;
    }, [items]);

    const allAlbums = useMemo(() => {
        const set = new Set<string>((items || []).map(i => (i.album || "uncategorized").toLowerCase()));
        return Array.from(set).sort();
    }, [items]);

    const allTags = useMemo(() => {
        const set = new Set<string>();
        for (const it of items) {
            const tags = Array.isArray(it.tags) ? it.tags : [];
            for (const t of tags) set.add(t);
        }
        return Array.from(set).sort();
    }, [items]);

    return (
        <PageWrapper>
            <HeaderBox header="Scrapbook" subtitle2="My scrapbook of memories." showFlashy={false}/>
            <div className="windowStyle" style={{ padding: "1rem", marginBottom: "1rem" }}>
                <div style={{ display: "flex", gap: "1rem", alignItems: "center", flexWrap: "wrap" }}>
                    <label>
                        Album:
                        <select value={album} onChange={(e) => { setAlbum(e.target.value); setPage(1); }} style={{ marginLeft: "0.5rem" }}>
                            <option value="">All</option>
                            {allAlbums.map(a => (
                                <option key={a} value={a}>{a}</option>
                            ))}
                        </select>
                    </label>
                    <label>
                        Tags (comma-separated):
                        <input value={tagFilter} onChange={(e) => { setTagFilter(e.target.value); setPage(1); }} style={{ marginLeft: "0.5rem" }} placeholder="e.g. travel, food" />
                    </label>
                </div>
            </div>
            {tagFilter.trim() && (
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(16rem, 1fr))", gap: "1rem" }}>
                    {items.map((it) => (
                        <Window key={it.id}>
                            <div className="windowContent">
                                <img src={it.imageUrl} alt={it.caption} style={{ width: "100%", height: "16rem", objectFit: "cover" }} />
                                <div style={{ padding: "0.5rem" }}>
                                    <div style={{ fontWeight: 600 }}>{it.caption}</div>
                                    <div style={{ fontSize: "0.85rem", opacity: 0.7 }}>{it.takenAt ? new Date(it.takenAt).toLocaleDateString() : ""}</div>
                                    <div style={{ marginTop: "0.5rem", display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
                                        {(Array.isArray(it.tags) ? it.tags : []).map(t => (
                                            <span key={t} style={{ border: "1px solid #ff8cb6", padding: "0.25rem 0.5rem", borderRadius: "0.25rem", fontSize: "0.8rem" }}>{t}</span>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </Window>
                    ))}
                </div>
            )}
            {tagFilter.trim() && (
                <div style={{ display: "flex", justifyContent: "center", gap: "1rem", marginTop: "1rem" }}>
                    <button className="buttonSecondary" onClick={() => setPage(Math.max(1, page - 1))}>{"< Prev"}</button>
                    <span>Page {page} / {Math.max(1, Math.ceil(total / 12))}</span>
                    <button className="buttonSecondary" onClick={() => setPage(page + 1)}>{"Next >"}</button>
                </div>
            )}

            {!tagFilter.trim() && album && (
                <>
                    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(16rem, 1fr))", gap: "1rem", marginTop: "1rem" }}>
                        {items.map((it) => (
                            <Window key={it.id}>
                                <div className="windowContent">
                                    <img src={it.imageUrl} alt={it.caption} style={{ width: "100%", height: "16rem", objectFit: "cover" }} />
                                    <div style={{ padding: "0.5rem" }}>
                                        <div style={{ fontWeight: 600 }}>{it.caption}</div>
                                        <div style={{ fontSize: "0.85rem", opacity: 0.7 }}>{it.takenAt ? new Date(it.takenAt).toLocaleDateString() : ""}</div>
                                        <div style={{ marginTop: "0.5rem", display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
                                            {(Array.isArray(it.tags) ? it.tags : []).map(t => (
                                                <span key={t} style={{ border: "1px solid #ff8cb6", padding: "0.25rem 0.5rem", borderRadius: "0.25rem", fontSize: "0.8rem" }}>{t}</span>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </Window>
                        ))}
                    </div>
                    <div style={{ display: "flex", justifyContent: "center", gap: "1rem", marginTop: "1rem" }}>
                        <button className="buttonSecondary" onClick={() => setPage(Math.max(1, page - 1))}>{"< Prev"}</button>
                        <span>Page {page}</span>
                        <button className="buttonSecondary" onClick={() => setPage(page + 1)}>{"Next >"}</button>
                    </div>
                </>
            )}

            {!tagFilter.trim() && !album && (
                Object.entries(groups).map(([alb, imgs]) => {
                    const top3 = imgs.slice(0, 3);
                    return (
                        <div key={alb} style={{ marginBottom: "2rem" }}>
                            <h2 style={{ textTransform: "capitalize" }}>{alb}</h2>
                            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(16rem, 1fr))", gap: "1rem" }}>
                                {top3.map((it) => (
                                    <Window key={it.id}>
                                        <div className="windowContent">
                                            <img src={it.imageUrl} alt={it.caption} style={{ width: "100%", height: "16rem", objectFit: "cover" }} />
                                            <div style={{ padding: "0.5rem" }}>
                                                <div style={{ fontWeight: 600 }}>{it.caption}</div>
                                                <div style={{ fontSize: "0.85rem", opacity: 0.7 }}>{it.takenAt ? new Date(it.takenAt).toLocaleDateString() : ""}</div>
                                                <div style={{ marginTop: "0.5rem", display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
                                                    {(Array.isArray(it.tags) ? it.tags : []).map(t => (
                                                        <span key={t} style={{ border: "1px solid #ff8cb6", padding: "0.25rem 0.5rem", borderRadius: "0.25rem", fontSize: "0.8rem" }}>{t}</span>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                    </Window>
                                ))}
                                <div style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                                    <button className="buttonSecondary" onClick={() => { setAlbum(alb); setPage(1); }}>See all</button>
                                </div>
                            </div>
                        </div>
                    );
                })
            )}
        </PageWrapper>
    )
}