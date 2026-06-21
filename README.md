# Random Sumit

Personal site and learning log. Built with Astro and Tailwind CSS.

## Stack

- [Astro](https://astro.build) v4
- Tailwind CSS v3 with a custom design token system
- MDX for post content

## Structure

```
src/
  content/
    life/     # Personal essays, running, reading, food, coffee
    work/     # Tech, things built, engineering decisions
  components/ # Header, PostCard, Sidebar, MobileNav, etc.
  layouts/    # BaseLayout, TwoColLayout
  lib/        # posts.ts — getAllPosts, getPostsForSection, helpers
  pages/      # index, /life, /work, /about, [slug] routes
  styles/     # global.css
```

## Writing posts

Create an `.mdx` file in `src/content/life/` or `src/content/work/`:

```yaml
---
title: "Post title"
date: 2026-06-22
excerpt: "One or two sentences shown on the listing page."
readTime: "5 min"
tags: ["tag"]

# Optional: show this post in both sections
showIn: ["life", "work"]

# Optional: link out to an external platform instead of an internal page
externalUrl: "https://randomsumit.substack.com/p/some-post"
platform: "Substack"
---
```

## Dev

```bash
npm install
npm run dev
```
