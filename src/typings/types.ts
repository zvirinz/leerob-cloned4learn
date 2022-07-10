// import { MDXRemoteSerializeResult } from 'next-mdx-remote';
import { MDXRemoteSerializeResult } from 'next-mdx-remote';
import { ParsedUrlQuery } from 'querystring';

export interface ITag {
  _id: string;
  title: string;
  slug: string;
}

export interface IPost {
  _id: string;
  slug: string;
  content: string;
  title: string;
  date: string;
  excerpt: string;
  tags?: ITag[];
  coverImage?: string;
  readingTime?: string;
  mdxContent?: MDXRemoteSerializeResult;
}

export interface ISnippet {
  _id: string;
  slug: string;
  content: string;
  title: string;
  description: string;
  logo: string;
  mdxContent?: MDXRemoteSerializeResult;
}

export interface ICurrentlyPlaying {
  songUrl?: string;
  artist?: string;
  title?: string;
  isPlaying: boolean;
}

export interface IContainerProps {
  title: string;
  description?: string;
  image?: string;
  type?: string;
  date?: string;
  tags?: string[];
  author?: string;
  children: React.ReactNode;
}

export interface IParams extends ParsedUrlQuery {
  slug: string;
}

export interface ISvg {
  [key: string]: React.ReactNode;
}

export interface IWakaLangStats {
  decimal: string;
  digital: string;
  hours: number;
  minutes: number;
  name: string;
  percent: number;
  text: string;
  total_seconds: bigint;
}
export interface IViews {
  total: number;
}

export interface ITwemoji {
  emoji: string;
  size?: 'twa-lg' | 'twa-2x' | 'twa-3x' | 'twa-4x' | 'twa-5x';
  className?: string;
}
