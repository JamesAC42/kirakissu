// Uploads a file through one of the admin upload routes and returns its public
// URL, or "" after telling the admin why it failed.
export async function uploadImage(endpoint: string, file: File): Promise<string> {
  try {
    const resp = await fetch(endpoint, { method: "POST", headers: { "content-type": file.type || "application/octet-stream" }, body: file });
    if (resp.ok) {
      const j = await resp.json();
      return j.url as string;
    }
    let reason = `${resp.status} ${resp.statusText}`;
    try {
      const j = await resp.json();
      if (j?.error) reason = j.error;
    } catch {}
    if (resp.status === 413) reason = "File is too large for the server to accept (413).";
    alert(`Image upload failed: ${reason}`);
  } catch (e) {
    alert(`Image upload failed: ${(e as Error).message}`);
  }
  return "";
}
