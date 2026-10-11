/**
 * One-time media import before moving dumbphones.co.in away from WordPress.
 * Run while the old site's /wp-content/uploads/ URLs are still reachable.
 * This saves the real product/editorial photos, official logo and video posters,
 * then rewrites their references to local /media/ paths; commit both the source
 * changes and public/media/ to Git.
 */
import { readFile, mkdir, writeFile, rename, rm } from "node:fs/promises";
import { join, dirname } from "node:path";

const files = ["src/lib/data.ts", "src/app/page.tsx", "src/app/about/page.tsx"];
const pattern = /https:\/\/dumbphones\.co\.in\/wp-content\/uploads\/[^"'\s`]+/g;
const sources = await Promise.all(files.map((file) => readFile(file, "utf8")));
const urls = [...new Set(sources.flatMap((text) => text.match(pattern) ?? []))];

if (!urls.length) {
  console.log("No WordPress media URLs found; images may already be vendored.");
  process.exit(0);
}

// Download first. Never rewrite source if one asset fails.
for (const url of urls) {
  const path = new URL(url).pathname.replace("/wp-content/uploads/", "");
  const target = join("public", "media", decodeURIComponent(path));
  const response = await fetch(url, { signal: AbortSignal.timeout(30_000) });
  if (!response.ok || !response.headers.get("content-type")?.startsWith("image/")) {
    throw new Error(`Image unavailable or invalid: ${url} (${response.status})`);
  }
  await mkdir(dirname(target), { recursive: true });
  const temp = `${target}.tmp`;
  try {
    await writeFile(temp, Buffer.from(await response.arrayBuffer()));
    await rename(temp, target);
  } finally {
    await rm(temp, { force: true });
  }
  console.log(`Saved ${target}`);
}

for (let i = 0; i < files.length; i++) {
  let text = sources[i];
  for (const url of urls) {
    text = text.replaceAll(url, `/media/${new URL(url).pathname.split("/wp-content/uploads/")[1]}`);
  }
  await writeFile(files[i], text);
}
console.log(`Vendored ${urls.length} images. Review and commit public/media/ plus updated source files.`);
