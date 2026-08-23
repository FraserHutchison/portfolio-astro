import { cp, mkdir, readdir, rm } from 'node:fs/promises';
import { extname, join } from 'node:path';

const sourceRoot = new URL('../src/content/posts/', import.meta.url);
const outputRoot = new URL('../public/posts/', import.meta.url);
const mediaExtensions = new Set(['.mp4', '.webm', '.mov']);

await rm(outputRoot, { recursive: true, force: true });
await mkdir(outputRoot, { recursive: true });

for (const folder of await readdir(sourceRoot, { withFileTypes: true })) {
  if (!folder.isDirectory()) continue;
  const source = new URL(`${folder.name}/`, sourceRoot);
  const output = new URL(`${folder.name}/`, outputRoot);
  await mkdir(output, { recursive: true });
  for (const file of await readdir(source, { withFileTypes: true })) {
    if (file.isFile() && mediaExtensions.has(extname(file.name).toLowerCase())) {
      await cp(join(source.pathname, file.name), join(output.pathname, file.name));
    }
  }
}
