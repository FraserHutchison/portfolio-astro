import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { z } from "astro/zod";

const posts = defineCollection({
  loader: glob({ pattern: "**/index.mdx", base: "./src/content/posts" }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      date: z.coerce.date(),
      description: z.string().optional(),
      cover: image().optional(),
      pinned: z.boolean().default(false),
      pinOrder: z.number().int().optional(),
      legacyPath: z.string().optional(),
      externalLink: z.url().optional(),
      draft: z.boolean().default(false),
    }),
});

export const collections = { posts };
