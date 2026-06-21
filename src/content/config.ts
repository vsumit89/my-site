import { defineCollection, z } from 'astro:content';

const postSchema = z.object({
  title: z.string(),
  date: z.date(),
  excerpt: z.string(),
  readTime: z.string(),
  tags: z.array(z.string()).optional().default([]),
  // Optional: list additional sections this post should appear in
  showIn: z.array(z.enum(['life', 'work'])).optional(),
  // Optional: links to an external platform instead of an internal page
  externalUrl: z.string().url().optional(),
  platform: z.string().optional(), // e.g. "Medium", "dev.to", "Substack"
});

export const collections = {
  life: defineCollection({ type: 'content', schema: postSchema }),
  work: defineCollection({ type: 'content', schema: postSchema }),
};
