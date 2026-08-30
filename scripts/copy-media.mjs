import { cp, mkdir, readdir, rm } from "node:fs/promises";
import { extname, join } from "node:path";
import { fileURLToPath } from "node:url";

const sourceRoot = fileURLToPath(new URL("../src/content/posts/", import.meta.url));
const outputRoot = fileURLToPath(new URL("../public/posts/", import.meta.url));
const mediaExtensions = new Set([".mp4", ".webm", ".mov"]);

await rm(outputRoot, { recursive: true, force: true });
await mkdir(outputRoot, { recursive: true });

for (const folder of await readdir(sourceRoot, { withFileTypes: true })) {
  if (!folder.isDirectory()) continue;
  const source = join(sourceRoot, folder.name);
  const output = join(outputRoot, folder.name);
  await mkdir(output, { recursive: true });
  for (const file of await readdir(source, { withFileTypes: true })) {
    if (
      file.isFile() &&
      mediaExtensions.has(extname(file.name).toLowerCase())
    ) {
      await cp(join(source, file.name), join(output, file.name));
    }
  }
}
