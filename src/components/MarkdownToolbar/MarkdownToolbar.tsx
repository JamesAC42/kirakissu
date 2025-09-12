"use client";

import styles from "./markdowntoolbar.module.scss";

type Props = {
  value: string;
  onChange: (next: string) => void;
  onUploadImage?: (file: File) => Promise<string>;
  disabled?: boolean;
};

export default function MarkdownToolbar({ value, onChange, onUploadImage, disabled }: Props) {
  const surround = (before: string, after: string = before) => {
    if (disabled) return;
    const next = `${before}${value}${after}`;
    onChange(next);
  };

  const insert = (snippet: string) => {
    if (disabled) return;
    const next = value ? `${value}\n${snippet}` : snippet;
    onChange(next);
  };

  const onUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !onUploadImage || disabled) return;
    const url = await onUploadImage(file);
    if (url) insert(`![image](${url})`);
    e.target.value = "";
  };

  return (
    <div className={styles.toolbar} aria-disabled={disabled}>
      <button type="button" onClick={() => surround("**")} disabled={!!disabled}>Bold</button>
      <button type="button" onClick={() => surround("*")} disabled={!!disabled}>Italic</button>
      <button type="button" onClick={() => insert("\n- ")} disabled={!!disabled}>List</button>
      <button type="button" onClick={() => insert("\n1. ")} disabled={!!disabled}>Numbered</button>
      <button type="button" onClick={() => surround("`")} disabled={!!disabled}>Code</button>
      <button type="button" onClick={() => insert("\n> ")} disabled={!!disabled}>Quote</button>
      <label className={styles.uploadBtn} aria-disabled={disabled}>
        Upload image
        <input type="file" accept="image/*" onChange={onUpload} disabled={!!disabled} />
      </label>
    </div>
  );
}


