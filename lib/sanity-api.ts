import { sanityClient } from './sanity-server';

import {
  allSnippetsQuery,
  indexQuery,
  postBySlugQuery,
  postQuery,
  postSlugsQuery,
  postUpdatedQuery,
  snippetSlugsQuery,
  snippetsQuery,
  tagRelatedPosts,
  tagSlugsQuery
} from './sanity-queries';

export interface ITag {
  _id: string;
  title: string;
  slug: string;
}

export interface SanityBlock {
  [key: string]: any;
  _type: 'block';
  // _type: 'block' | 'image';
}

export interface BlockContent {
  _type: 'blockContent';
  _key: string;
  text: string;
}
export interface IPost {
  _id: string;
  slug: string;
  content: string;
  body: BlockContent;
  title: string;
  date: string;
  excerpt: string;
  tags: ITag[];
  mainImage: string;
  readingTime?: string;
}

export interface ISnippet {
  _id: string;
  slug: string;
  body: BlockContent;
  title: string;
  description: string;
  iconTitle: string;
}

export const getPosts = async (): Promise<IPost[]> => {
  const posts = await sanityClient.fetch(indexQuery);
  return posts;
};

export const getPostSlugs = async (): Promise<string[]> => {
  const slugs = await sanityClient.fetch(postSlugsQuery);
  return slugs;
};

export const getPost = async (slug: string): Promise<IPost> => {
  const { post } = await sanityClient.fetch(postQuery, { slug: slug });
  return post ?? null;
};

export const getPostBySlug = async (slug: string): Promise<IPost> => {
  const { post } = await sanityClient.fetch(postBySlugQuery, { slug });
  return post ?? null;
};
export const getUpdatedPostSlug = async (id: string): Promise<string> => {
  const slug = sanityClient.fetch(postUpdatedQuery, { id });
  return slug ?? null;
};

export const getSnippets = async (): Promise<ISnippet[]> => {
  const snippets = await sanityClient.fetch(allSnippetsQuery);
  return snippets ?? null;
};

export const getSnippetSlugs = async (): Promise<string[]> => {
  const slugs = await sanityClient.fetch(snippetSlugsQuery);
  return slugs ?? null;
};

export const getSnippet = async (slug: string): Promise<ISnippet> => {
  const { snippet } = await sanityClient.fetch(snippetsQuery, { slug });
  return snippet ?? null;
};

export const getTagSlugs = async (): Promise<string[]> => {
  const slugs = await sanityClient.fetch(tagSlugsQuery);
  return slugs ?? null;
};

export const getPostsByTag = async (
  slug: string
): Promise<{
  title: string;
  posts: IPost[];
}> => {
  const posts = await sanityClient.fetch(tagRelatedPosts, { slug });
  return posts ?? null;
};
