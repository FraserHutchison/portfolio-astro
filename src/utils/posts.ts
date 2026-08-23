import type { CollectionEntry } from "astro:content";

type Post = CollectionEntry<"posts">;

const DEFAULT_PIN_ORDER = Number.MAX_SAFE_INTEGER;

export function getPostSlug(post: Post) {
  return post.id.split("/")[0];
}

export function sortPosts(a: Post, b: Post) {
  if (a.data.pinned !== b.data.pinned) return a.data.pinned ? -1 : 1;

  if (a.data.pinned && b.data.pinned) {
    return (
      (a.data.pinOrder ?? DEFAULT_PIN_ORDER) -
      (b.data.pinOrder ?? DEFAULT_PIN_ORDER)
    );
  }

  return b.data.date.valueOf() - a.data.date.valueOf();
}
