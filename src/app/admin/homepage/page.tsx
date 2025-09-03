"use client";

import { useEffect, useState } from "react";
import styles from "../admin.module.scss";

type Profile = { headerText?: string; subHeaderText?: string };
type Status = Record<string, string>;
type FAQ = { faqs: { question: string; answer: string }[] };
type Favorites = { favorites: { type: string; emoji: string; value: string }[] };
type Todo = { todos: { id: string; title: string; completed: boolean }[] };

async function fetchJson<T>(url: string): Promise<T | null> {
  try {
    const r = await fetch(url);
    if (!r.ok) return null;
    return (await r.json()) as T;
  } catch {
    return null;
  }
}

async function putJson(url: string, body: unknown): Promise<boolean> {
  const r = await fetch(url, { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify(body) });
  return r.ok;
}

export default function AdminHomepageEditor() {
  const [profile, setProfile] = useState<Profile>({ headerText: "", subHeaderText: "" });
  const [status, setStatus] = useState<Status>({ mood: "", watching: "", playing: "" });
  const [faq, setFaq] = useState<FAQ>({ faqs: [] });
  const [favorites, setFavorites] = useState<Favorites>({ favorites: [] });
  const [todo, setTodo] = useState<Todo>({ todos: [] });
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState<string>("");

  useEffect(() => {
    (async () => {
      const [p, s, f, fav, t] = await Promise.all([
        fetchJson<Profile>("/api/admin/settings/profile"),
        fetchJson<Status>("/api/admin/settings/status"),
        fetchJson<FAQ>("/api/admin/settings/faq"),
        fetchJson<Favorites>("/api/admin/settings/favorites"),
        fetchJson<Todo>("/api/admin/settings/todo"),
      ]);
      if (p) setProfile(p);
      if (s) setStatus(s);
      if (f) setFaq(f);
      if (fav) setFavorites(fav);
      if (t) setTodo(t);
    })();
  }, []);

  const save = async () => {
    setSaving(true);
    setMsg("");
    const ok = await Promise.all([
      putJson("/api/admin/settings/profile", profile),
      putJson("/api/admin/settings/status", status),
      putJson("/api/admin/settings/faq", faq),
      putJson("/api/admin/settings/favorites", favorites),
      putJson("/api/admin/settings/todo", todo),
    ]);
    setSaving(false);
    setMsg(ok.every(Boolean) ? "Saved" : "Some saves failed");
  };

  return (
    <div className={styles.adminRoot}>
      <div className={`${styles.adminContainer}`}>
      <div className={styles.toolbar}>
        <h1 className={styles.adminTitle}>Homepage editor</h1>
        <a className={styles.buttonSecondary + ' ' + styles.backLink} href="/admin">← Back</a>
      </div>
      {msg && <div className={styles.msg}>{msg}</div>}

      <section className={styles.adminSection}>
        <h2>Profile</h2>
        <label>Header<br/>
          <input value={profile.headerText ?? ""} onChange={(e) => setProfile({ ...profile, headerText: e.target.value })} />
        </label>
        <br/>
        <label>Subheader<br/>
          <input value={profile.subHeaderText ?? ""} onChange={(e) => setProfile({ ...profile, subHeaderText: e.target.value })} />
        </label>
      </section>

      <section className={styles.adminSection}>
        <h2>Status</h2>
        {Object.entries(status).map(([k, v]) => (
          <div key={k} className={styles.fieldRow}>
            <input value={k} onChange={(e) => {
              const newKey = e.target.value;
              const entries = Object.entries(status).map(([kk, vv]) => (kk === k ? [newKey, vv] : [kk, vv]));
              setStatus(Object.fromEntries(entries));
            }} />
            <input value={v} onChange={(e) => setStatus({ ...status, [k]: e.target.value })} />
            <button className={styles.buttonSecondary} onClick={() => {
              const s = { ...status };
              delete s[k];
              setStatus(s);
            }}>Remove</button>
          </div>
        ))}
        <button className={styles.buttonSecondary} onClick={() => {
          let i = 1; let key = `field${i}`;
          while (status[key] !== undefined) { i++; key = `field${i}`; }
          setStatus({ ...status, [key]: "" });
        }}>Add field</button>
      </section>

      <section className={styles.adminSection}>
        <h2>FAQ</h2>
        {(faq.faqs ?? []).map((q, i) => (
          <div key={i} className={styles.fieldRow}>
            <input placeholder="Question" value={q.question} onChange={(e) => {
              const faqs = [...(faq.faqs ?? [])]; faqs[i] = { ...faqs[i], question: e.target.value }; setFaq({ faqs });
            }} />
            <textarea placeholder="Answer" value={q.answer} onChange={(e) => {
              const faqs = [...(faq.faqs ?? [])]; faqs[i] = { ...faqs[i], answer: e.target.value }; setFaq({ faqs });
            }} />
          </div>
        ))}
        <button className={styles.buttonSecondary} onClick={() => setFaq({ faqs: [...(faq.faqs ?? []), { question: "", answer: "" }] })}>Add FAQ</button>
      </section>

      <section className={styles.adminSection}>
        <h2>Favorites</h2>
        {(favorites.favorites ?? []).map((f, i) => (
          <div key={i} className={styles.fieldRow}>
            <input placeholder="Type" value={f.type} onChange={(e) => {
              const arr = [...(favorites.favorites ?? [])]; arr[i] = { ...arr[i], type: e.target.value }; setFavorites({ favorites: arr });
            }} />
            <input placeholder="Emoji" value={f.emoji} onChange={(e) => {
              const arr = [...(favorites.favorites ?? [])]; arr[i] = { ...arr[i], emoji: e.target.value }; setFavorites({ favorites: arr });
            }} />
            <input placeholder="Value" value={f.value} onChange={(e) => {
              const arr = [...(favorites.favorites ?? [])]; arr[i] = { ...arr[i], value: e.target.value }; setFavorites({ favorites: arr });
            }} />
            <button className={styles.buttonSecondary} onClick={() => {
              const arr = [...(favorites.favorites ?? [])];
              arr.splice(i, 1);
              setFavorites({ favorites: arr });
            }}>Remove</button>
          </div>
        ))}
        <button className={styles.buttonSecondary} onClick={() => setFavorites({ favorites: [...(favorites.favorites ?? []), { type: "", emoji: "", value: "" }] })}>Add favorite</button>
      </section>

      <section className={styles.adminSection}>
        <h2>To-do</h2>
        {(todo.todos ?? []).map((t, i) => (
          <div key={i} className={styles.tripleRow}>
            <input placeholder="ID" value={t.id} onChange={(e) => {
              const arr = [...(todo.todos ?? [])]; arr[i] = { ...arr[i], id: e.target.value }; setTodo({ todos: arr });
            }} />
            <input placeholder="Title" value={t.title} onChange={(e) => {
              const arr = [...(todo.todos ?? [])]; arr[i] = { ...arr[i], title: e.target.value }; setTodo({ todos: arr });
            }} />
            <label><input type="checkbox" checked={!!t.completed} onChange={(e) => {
              const arr = [...(todo.todos ?? [])]; arr[i] = { ...arr[i], completed: e.target.checked }; setTodo({ todos: arr });
            }} /> Completed</label>
          </div>
        ))}
        <button className={styles.buttonSecondary} onClick={() => setTodo({ todos: [...(todo.todos ?? []), { id: "", title: "", completed: false }] })}>Add item</button>
      </section>

      <div className={styles.actionsRow}>
        <button className={styles.buttonPrimary} onClick={save} disabled={saving}>{saving ? "Saving..." : "Save all"}</button>
        <a className={styles.buttonSecondary + ' ' + styles.backLink} href="/admin">Back</a>
      </div>
      </div>
    </div>
  );
}


