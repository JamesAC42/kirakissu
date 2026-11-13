import { S3Client, PutObjectCommand, type PutObjectCommandInput } from "@aws-sdk/client-s3";

/**
 * Object storage for uploaded media. Works with AWS S3 or any S3-compatible
 * store such as Cloudflare R2.
 *
 * For R2 set AWS_S3_ENDPOINT=https://<account-id>.r2.cloudflarestorage.com,
 * AWS_REGION=auto, and AWS_S3_PUBLIC_BASE_URL to the bucket's public domain.
 */
type StorageConfig = {
  client: S3Client;
  bucket: string;
  publicBaseUrl: string;
  useAcl: boolean;
};

export class StorageConfigError extends Error {}

function getConfig(): StorageConfig {
  const endpoint = process.env.AWS_S3_ENDPOINT || undefined;
  const region = process.env.AWS_REGION || process.env.AWS_DEFAULT_REGION || (endpoint ? "auto" : undefined);
  const bucket = process.env.AWS_S3_BUCKET;
  const accessKeyId = process.env.AWS_ACCESS_KEY_ID;
  const secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY;

  if (!region) throw new StorageConfigError("Missing AWS_REGION (or AWS_DEFAULT_REGION)");
  if (!bucket) throw new StorageConfigError("Missing AWS_S3_BUCKET");
  if (!accessKeyId || !secretAccessKey) throw new StorageConfigError("Missing AWS_ACCESS_KEY_ID/AWS_SECRET_ACCESS_KEY");

  let publicBaseUrl = process.env.AWS_S3_PUBLIC_BASE_URL;
  if (!publicBaseUrl) {
    // A custom endpoint (R2 etc.) has no public URL we can guess.
    if (endpoint) throw new StorageConfigError("Missing AWS_S3_PUBLIC_BASE_URL (required with AWS_S3_ENDPOINT)");
    publicBaseUrl = `https://${bucket}.s3.${region}.amazonaws.com`;
  }

  const client = new S3Client({
    region,
    endpoint,
    credentials: { accessKeyId, secretAccessKey },
    // R2 and most S3-compatible stores only support the checksums S3 requires.
    requestChecksumCalculation: "WHEN_REQUIRED",
    responseChecksumValidation: "WHEN_REQUIRED",
  });

  return {
    client,
    bucket,
    publicBaseUrl: publicBaseUrl.replace(/\/+$/, ""),
    // R2 does not support object ACLs; only enable for AWS buckets that allow them.
    useAcl: process.env.AWS_S3_USE_ACL === "true",
  };
}

/** Uploads a file and returns its public URL. */
export async function putPublicObject(key: string, body: Buffer, contentType: string): Promise<{ url: string; key: string }> {
  const { client, bucket, publicBaseUrl, useAcl } = getConfig();
  const params: PutObjectCommandInput = {
    Bucket: bucket,
    Key: key,
    Body: body,
    ContentType: contentType,
  };
  if (useAcl) params.ACL = "public-read";
  await client.send(new PutObjectCommand(params));
  return { url: `${publicBaseUrl}/${key}`, key };
}
