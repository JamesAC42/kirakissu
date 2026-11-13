# kirakissu

source code for the blog website kirakissu 

## Development

1. Install deps: `npm install`
2. Set up `.env` with required variables:

```
DATABASE_URL=postgresql://USER:PASSWORD@HOST:PORT/DBNAME?schema=public
ADMIN_USERNAME=admin
ADMIN_PASSWORD_HASH=<bcrypt-hash>
JWT_SECRET=replace-with-a-long-random-string
NEXT_PUBLIC_TURNSTILE_SITE_KEY=your-site-key
TURNSTILE_SECRET_KEY=your-secret-key

# Image uploads (Cloudflare R2, or any S3-compatible store)
AWS_S3_ENDPOINT=https://<account-id>.r2.cloudflarestorage.com
AWS_REGION=auto
AWS_S3_BUCKET=kirakissu-media
AWS_ACCESS_KEY_ID=...        # R2 API token, Object Read & Write on this bucket
AWS_SECRET_ACCESS_KEY=...
# Public URL for the bucket (R2 custom domain). Required when AWS_S3_ENDPOINT is set.
AWS_S3_PUBLIC_BASE_URL=https://media.kirakissu.com
# Leave unset for R2 (no ACL support). Only "true" for AWS buckets that allow ACLs.
AWS_S3_USE_ACL=
```

In production these must be in the container's environment on the sites server, not just a local `.env`.
For plain AWS S3, leave `AWS_S3_ENDPOINT` unset and set a real region; the public URL then defaults to `https://<bucket>.s3.<region>.amazonaws.com`.
If the public media domain changes, add its hostname to `images.remotePatterns` in `next.config.ts`.

3. Prisma setup:

```
npm run prisma:generate
npm run prisma:migrate
node --import tsx prisma/seed.ts
```

4. Run:

```
npm run dev
```