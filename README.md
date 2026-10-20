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

# Image uploads (S3)
AWS_REGION=us-east-1
AWS_S3_BUCKET=your-bucket
AWS_ACCESS_KEY_ID=...
AWS_SECRET_ACCESS_KEY=...
# Optional: CDN/custom domain for image URLs (defaults to https://<bucket>.s3.<region>.amazonaws.com)
AWS_S3_PUBLIC_BASE_URL=
# Optional: only set to "true" if the bucket allows ACLs
AWS_S3_USE_ACL=
```

In production these must be in the container's environment on the sites server, not just a local `.env`.

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