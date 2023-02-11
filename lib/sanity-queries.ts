import { groq } from 'next-sanity';

import { POSTS_LIMIT } from 'config';

const postFields = `
  _id,
  title,
  "slug": slug.current,
  "date": _updatedAt,
  coverImage,
  "tags": tags[] -> {
    _id,
    title,
    "slug": slug.current
  },
`;

const snippetFields = groq`
  _id,
  title,
  description,
  iconTitle,
  "slug": slug.current,
`;

// post-related queries

export const indexQuery = groq`
  *[_type == "post"] | order(date desc, _updatedAt desc) {
    _id,
    title,
    "slug": slug.current,
    "tags": tags[] -> {
      _id,
      title,
      "slug": slug.current
    },
    "excerpt": array::join(string::split((pt::text(body[_type == "block"][0...1])), "")[0..255], "") + "..."
  }`;

export const postQuery = groq`{
"post": *[_type == "post" && slug.current == $slug] | order(_updatedAt desc) [0] {
    _id,
    title,
    "slug": slug.current,
    "date": _updatedAt,
    coverImage,
    "tags": tags[] -> {
      _id,
      title,
      "slug": slug.current
    },
    body[] {
      ...,
      markDefs[] {
        ...,
        _type == "internalLink" => {
          "slug": @.reference->slug.current,
          "type": @.reference->_type,
          "title": @.reference->title
        }
      }
    },
    "excerpt": array::join(string::split((pt::text(body[_type == "block"][0...1])), "")[0..255], "") + "...",
    "readingTime": round(length(pt::text(body)) / 5 / 180 ),
  }
}
`;

export const postSlugsQuery = groq`
*[_type == "post" && defined(slug.current)][].slug.current
`;

export const postBySlugQuery = groq`
*[_type == "post" && slug.current == $slug][0] {
  ${postFields}
}
`;
export const tagRelatedPosts = groq`
*[_type == "tag" && slug.current == $slug] {
  title,
  "posts":  *[_type == 'post' && references(^._id)] {
    _id,
    title,
    "slug": slug.current,
    "tags": tags[] -> {
      _id,
      title,
      "slug": slug.current
    },
    "excerpt": array::join(string::split((pt::text(body[_type == "block"][0...1])), "")[0..255], "") + "..."
  } [0...${POSTS_LIMIT}]  | order(_updatedAt desc)
}[0]
`;

export const postUpdatedQuery = groq`*[_type == "post" && _id == $id].slug.current`;

// snippet-related queries

export const allSnippetsQuery = groq`
*[_type == "snippet"] | order(date desc, _updatedAt desc) {
  ${snippetFields}
}`;

export const snippetsQuery = groq`
{
  "snippet": *[_type == "snippet" && slug.current == $slug] | order(_updatedAt desc) [0] {
    _id,
    title,
    description,
    iconTitle,
    "slug": slug.current,
    body[] {
      ...,
      markDefs[] {
        ...,
        _type == "internalLink" => {
          "slug": @.reference->slug.current,
          "type": @.reference->_type,
          "title": @.reference->title,
        }
      }
    },
  }
}`;

export const snippetSlugsQuery = groq`
*[_type == "snippet" && defined(slug.current)][].slug.current
`;

// tag-related queries

export const tagSlugsQuery = groq`
*[_type == "tag" && defined(slug.current)][].slug.current
`;