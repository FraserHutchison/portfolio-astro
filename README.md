# fraserh.dev

Technical-art portfolio, built with Astro and deployed to GitHub Pages.

https://fraserh.dev/

<details>
<summary>Add a post</summary>

1. Duplicate a folder in `src/content/posts`.
2. Rename the folder to the new post slug.
3. Edit `index.mdx` and its small frontmatter block.
4. Keep images and videos in the same folder and reference them relatively.
5. Commit and push to `main`; GitHub Pages deploys automatically.

Normal images use Markdown: `![Description](./image.webp)`.

To control an image's rendered width, import it and use `SizedImage`. The width
accepts percentages, pixels, or rem values and remains capped to the viewport:

```mdx
import shaderVariants from './shader-variants.webp';

<SizedImage
  src={shaderVariants}
  alt="Shader variants window"
  width="60%"
  align="center"
  caption="Optional caption"
/>
```

`align` is optional and accepts `left`, `center` (the default), or `right`.
Passing a number such as `width={520}` uses pixels.

- Local video uses `<Video src="./clip.mp4" autoplay loop muted />` and YouTube uses `<YouTube url="https://www.youtube.com/watch?v=..." />`.

- Pinned posts appear first without a label. Set `pinned: true` and `pinOrder: 1` in frontmatter. All other posts are newest-first.

- Set `draft: true` to keep an unfinished post and its legacy redirect out of the generated site.
</details>

<details>
<summary>Edit the homepage introduction</summary>

Edit `src/content/pages/home.mdx`. The frontmatter controls the page title and
search description, your name and role, social links, and optional hero artwork.
The body below the frontmatter is the introductory text; normal Markdown and
`YouTube`, `Video`, and `SizedImage` components work without imports.

The Unity icon strip and automatically populated post list stay in the page
template. Edit the longer biography separately in `src/content/pages/about.mdx`.

</details>

<details>
<summary>Edit the About introduction</summary>

Edit `src/content/pages/about.mdx`:

- The frontmatter controls the page title and search description, your name and
  role, profile picture and alt text, and social links. Icons on links are optional.
- The body below the frontmatter is the biography. Use normal Markdown for
  paragraphs, emphasis, lists, images, and links.
- `YouTube`, `Video`, and `SizedImage` components are available without imports,
  just like in project descriptions.
- The experience section below the introduction is populated automatically from
  the company and project files described below.

The Astro page provides the layout; everyday content edits belong in the MDX file.

</details>

<details>
<summary>Add or edit an About-page project</summary>

Each project is a Markdown file in `src/content/projects`. Duplicate an existing
file or create a new `.md` or `.mdx` file with a unique filename. Use `.mdx`
when including components such as `<YouTube />`:

```markdown
---
title: "My new game"
company: "sega-hardlight"
platform: "PC & Console"
image: "/about/my-new-game.webp"
alt: "My new game cover artwork"
url: "https://example.com/my-new-game"
order: 5
draft: false
---

Write an optional description here. **Formatting**, lists, additional pictures,
and [links](https://example.com) use normal Markdown.
```

- Put pictures in `public/about` and reference them as `/about/filename.webp`.
  Body images also use public paths: `![Screenshot](/about/screenshot.webp)`.
- `company` is the filename of a company Markdown file, without `.md`. Astro
  validates this reference, so a typo is reported during preview/build.
- Projects are automatically grouped by company. Lower `order` values appear
  first within each group; matching values are sorted by title. Omit `order` to
  use 100. Set `draft: true` to hide a project.
- For YouTube previews, use a `.mdx` extension and add the component below the
  frontmatter (no import required):

  ```mdx
  <YouTube url="https://www.youtube.com/watch?v=hX9daejGFXA" />
  ```

  `Video` and `SizedImage` are also available in project MDX descriptions.
  Plain `.md` files support ordinary Markdown, but cannot render components.
  Rename a project rather than keeping both `.md` and `.mdx` copies with the
  same filename.
- The body below the frontmatter is the description shown below the project.
  Leave it empty to display just the artwork, platform, and title.
- Edit a file to update the page, add one to add a project, or remove one to
  remove it. The local preview updates automatically. Commit and push to `main`
  to update the deployed site through GitHub Pages.

Company details live in `src/content/companies`. To add a company, create a file
such as `my-studio.md`:

```yaml
---
name: "My Studio"
logo: "/about/my-studio.webp"
role: "Technical Artist"
tenure: "March 2027 — Present"
order: 1
---
```

Then use `company: "my-studio"` in its projects. Company `order` controls the
group order, with names breaking ties. Companies without published projects are
hidden. Company Markdown bodies are unused; edit their frontmatter fields.

</details>

<details>
<summary>Asset guide</summary>

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
</details>

## Local preview

```sh
npm install
npm run dev
```

Run `npm run build` before pushing a structural change.
