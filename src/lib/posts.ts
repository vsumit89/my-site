import { getCollection } from 'astro:content';

export type PostType = 'life' | 'work';

export interface PostEntry {
  slug: string;
  type: PostType;
  data: {
    title: string;
    date: Date;
    excerpt: string;
    readTime: string;
    tags: string[];
    showIn?: PostType[];
    externalUrl?: string;
    platform?: string;
  };
}

export async function getAllPosts(): Promise<PostEntry[]> {
  const [lifePosts, workPosts] = await Promise.all([
    getCollection('life'),
    getCollection('work'),
  ]);

  const all: PostEntry[] = [
    ...lifePosts.map(p => ({ ...p, type: 'life' as PostType })),
    ...workPosts.map(p => ({ ...p, type: 'work' as PostType })),
  ];

  return all.sort((a, b) => b.data.date.getTime() - a.data.date.getTime());
}

export function formatDate(date: Date): string {
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

export function postHref(type: PostType, slug: string): string {
  return `/${type}/${slug}`;
}

export function getPostsForSection(posts: PostEntry[], section: PostType): PostEntry[] {
  return posts.filter(p =>
    p.type === section || p.data.showIn?.includes(section)
  );
}
