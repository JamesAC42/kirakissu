import { SignJWT, jwtVerify } from "jose";

const JWT_COOKIE = "admin_token";

function getJwtSecret(): Uint8Array {
  const secret = process.env.JWT_SECRET;
  if (!secret) {
    throw new Error("JWT_SECRET is not set");
  }
  return new TextEncoder().encode(secret);
}

export async function signAdminJwt(payload: Record<string, unknown>): Promise<string> {
  return await new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("7d")
    .sign(getJwtSecret());
}

export async function verifyAdminJwt(token: string): Promise<Record<string, unknown> | null> {
  try {
    const { payload } = await jwtVerify(token, getJwtSecret());
    return payload as Record<string, unknown>;
  } catch {
    return null;
  }
}

export function getAuthCookieName(): string {
  return JWT_COOKIE;
}

function normalizeEnvValue(value: string | undefined): string | null {
  if (!value) return null;
  // Trim whitespace and strip surrounding quotes (common when secrets are copied with quotes)
  const trimmed = value.trim();
  const unquoted = trimmed.replace(/^['"]|['"]$/g, "").trim();
  return unquoted.length ? unquoted : null;
}

function maskIp(ip: string): string {
  if (ip.includes(".")) {
    const parts = ip.split(".");
    if (parts.length === 4) return `${parts[0]}.${parts[1]}.***.***`;
  }
  // IPv6 or unexpected formats: keep only a short prefix
  return `${ip.slice(0, 6)}…`;
}

export async function verifyTurnstile(token: string, ip?: string): Promise<boolean> {
  const debug = process.env.TURNSTILE_DEBUG === "1" || process.env.NODE_ENV !== "production";
  const secret = normalizeEnvValue(process.env.TURNSTILE_SECRET_KEY);
  if (!secret) {
    console.warn("[verifyTurnstile] Missing TURNSTILE_SECRET_KEY env");
    return false;
  }
  try {
    const formData = new FormData();
    formData.append("secret", secret);
    formData.append("response", token);
    if (ip) {
      formData.append("remoteip", ip);
      if (debug) console.log("[verifyTurnstile] Provided remoteip:", maskIp(ip));
    }

    if (debug) {
      console.log("[verifyTurnstile] Sending Turnstile siteverify request...", {
        secretLen: secret.length,
        secretLast4: secret.slice(-4),
      });
    } else {
      console.log("[verifyTurnstile] Sending Turnstile siteverify request...");
    }
    const resp = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
      method: "POST",
      body: formData,
    });

    if (!resp.ok) {
      console.warn(`[verifyTurnstile] Non-OK HTTP response: ${resp.status} ${resp.statusText}`);
      return false;
    }

    const data = (await resp.json()) as {
      success?: boolean;
      "error-codes"?: string[];
      messages?: unknown[];
      hostname?: string;
      challenge_ts?: string;
      action?: string;
    };
    if (debug) {
      console.log("[verifyTurnstile] Verification response data:", data);
    } else if (!data.success) {
      console.warn("[verifyTurnstile] Verification failed:", { "error-codes": data["error-codes"] });
    }

    if (!data.success && data["error-codes"]) {
      console.warn("[verifyTurnstile] Turnstile verification errors:", data["error-codes"]);
    }
    return !!data.success;
  } catch (err) {
    console.error("[verifyTurnstile] Error during Turnstile verification:", err);
    return false;
  }
}



