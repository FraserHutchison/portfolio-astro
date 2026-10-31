import { defineCollection, reference } from "astro:content";
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

const companies = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/companies" }),
  schema: z.object({
    name: z.string().min(1),
    logo: z.string().min(1),
    role: z.string().min(1),
    tenure: z.string().min(1),
    order: z.number().int().default(100),
  }),
});

const projects = defineCollection({
  loader: glob({ pattern: "**/*.{md,mdx}", base: "./src/content/projects" }),
  schema: z.object({
    title: z.string().min(1),
    company: reference("companies"),
    platform: z.string().min(1),
    image: z.string().min(1),
    alt: z.string().min(1),
    url: z.url(),
    order: z.number().int().default(100),
    draft: z.boolean().default(false),
  }),
});

const pages = defineCollection({
  loader: glob({ pattern: "**/*.mdx", base: "./src/content/pages" }),
  schema: z.object({
    title: z.string().min(1),
    description: z.string().min(1),
    name: z.string().min(1),
    role: z.string().min(1),
    profile: z.object({
      image: z.string().min(1),
      alt: z.string().min(1),
    }).optional(),
    hero: z.object({
      image: z.string().min(1),
      alt: z.string(),
    }).optional(),
    links: z.array(z.object({
      label: z.string().min(1),
      url: z.url(),
      icon: z.string().min(1).optional(),
    })).default([]),
  }),
});

export const collections = { posts, companies, projects, pages };
