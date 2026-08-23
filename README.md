# fraserh.dev

Fraser Hutchison’s technical-art portfolio, built with Astro and deployed to GitHub Pages.

## Add a post

1. Duplicate a folder in `src/content/posts`.
2. Rename the folder to the new post slug.
3. Edit `index.mdx` and its small frontmatter block.
4. Keep images and videos in the same folder and reference them relatively.
5. Commit and push to `main`; GitHub Pages deploys automatically.

Normal images use Markdown: `![Description](./image.webp)`.

Local video uses `<Video src="./clip.mp4" autoplay loop muted />` and YouTube uses `<YouTube url="https://www.youtube.com/watch?v=..." />`. Both components are automatically available in every post.

Pinned posts appear first without a label. Set `pinned: true` and `pinOrder: 1` in frontmatter. All other posts are newest-first.

## Local preview

```sh
npm install
npm run dev
```

Run `npm run build` before pushing a structural change.

## Model credit
