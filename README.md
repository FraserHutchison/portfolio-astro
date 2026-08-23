# fraserh.dev

Technical-art portfolio, built with Astro and deployed to GitHub Pages.

<summary>
## Add a post

1. Duplicate a folder in `src/content/posts`.
2. Rename the folder to the new post slug.
3. Edit `index.mdx` and its small frontmatter block.
4. Keep images and videos in the same folder and reference them relatively.
5. Commit and push to `main`; GitHub Pages deploys automatically.

Normal images use Markdown: `![Description](./image.webp)`.

- Local video uses `<Video src="./clip.mp4" autoplay loop muted />` and YouTube uses `<YouTube url="https://www.youtube.com/watch?v=..." />`.

- Pinned posts appear first without a label. Set `pinned: true` and `pinOrder: 1` in frontmatter. All other posts are newest-first.

- Set `draft: true` to keep an unfinished post and its legacy redirect out of the generated site.
</summary>

<summary>
## Asset guide

Keep post-specific media beside that post's `index.mdx`. Export images at the sizes below before adding them to the repository; Astro will create smaller responsive versions where appropriate.

| Asset | Recommended source size | Format | Notes |
| --- | ---: | --- | --- |
| Post cover / blog icon | `1600 × 800` (2:1) | WebP | Used by the homepage project list. Keep important content away from the extreme edges. |
| Wide article image | `2000 × 1125` (16:9) | WebP | A good default for screenshots and rendered imagery. Other aspect ratios are supported. |
| UI screenshot with small text | Up to `2400px` wide | WebP or PNG | Use PNG only when WebP makes fine text or sharp interface edges noticeably worse. |
| About profile picture | `1200 × 1200` (1:1) | WebP | Keep the subject centred for responsive cropping. |
| Game icon | `512 × 512` (1:1) | WebP | All game artwork is displayed in a square frame. |
| Company or social logo | Vector, when available | SVG | Use transparent WebP or PNG when no suitable SVG exists. |
| Homepage hero artwork | `1200 × 1200` | WebP, PNG, or SVG | SVG is preferred for line art; WebP is preferred for a rendered image. |
| Unity strip icon | `256 × 256` | PNG or WebP | Preserve transparency and leave consistent clear space around each icon. |
| Video poster | Match the video dimensions | WebP | A still frame displayed before playback begins. |

### Choosing a format

- Use **WebP** for most photographs, renders, thumbnails, and screenshots. It is smaller than JPEG or PNG at comparable visual quality.
- Use **SVG** for simple logos, icons, diagrams, and line artwork that can remain vector-based.
- Use **PNG** when lossless detail or alpha transparency is important and WebP produces visible artefacts.
- Avoid GIF for substantial animation. GIF files are usually much larger and lower quality than video.

### Video

Use an **MP4 file encoded with H.264** for local video. This has the broadest browser support with the site's current `<Video>` component. Keep video at `1920 × 1080` or smaller unless the extra resolution is genuinely needed.

For short looping demonstrations, remove the audio track and use:

```mdx
<Video src="./effect-loop.mp4" poster="./effect-loop-poster.webp" autoplay loop muted />
```

For longer or narrated videos, use controls:

```mdx
<Video src="./breakdown.mp4" poster="./breakdown-poster.webp" controls />
```

Use YouTube for long videos when repository size or streaming bandwidth would otherwise become significant.
</summary>

## Local preview

```sh
npm install
npm run dev
```

Run `npm run build` before pushing a structural change.
