import Image from 'next/image';
import { ArticleJsonLd } from 'next-seo';
import { font_mono } from 'fonts';

import { getPost, getPostSlugs } from 'lib/sanity-api';
import { Tags } from 'components/Tags';

import BlockContent from 'components/BlockContent';
import { createRemoteImageAttributes } from 'lib/createRemoteImageAttributes.ts';

export async function generateStaticParams() {
  const paths = await getPostSlugs();
  return paths.map((slug) => ({ slug: slug }));
}
export default async function PostPage({
  params
}: {
  params: {
    slug: string;
  };
}) {
  const post = await getPost(params.slug);
  const { width, height, base64, img } = await createRemoteImageAttributes(
    post.coverImage
  );
  return (
    <article className='flex flex-col items-start justify-center w-full max-w-2xl mx-auto mb-12'>
      <ArticleJsonLd
        useAppDir={true}
        type='BlogPosting'
        url='https://example.com/blog'
        title={`${post.title} Dzmitry Svirin`}
        images={[img.src]}
        datePublished={new Date(post.date).toISOString()}
        authorName='Dzmitry Svirin'
        description={post.excerpt}
      />
      <div className={font_mono.variable}>
        <Tags tags={post.tags} />
        <h1 className='mb-4 md:mb-6 text-3xl font-bold  tracking-tight capsize  md:text-5xl text-gray-100'>
          {post.title}
        </h1>
        {post.coverImage && (
          <div className='flex flex-col w-full my-4'>
            <Image
              src={img.src}
              alt={`Image for ${post.title}`}
              width={width}
              height={height}
              className='rounded-lg  h-auto'
              priority={true}
              placeholder='blur'
              blurDataURL={base64}
            />
          </div>
        )}
        <div className='flex flex-row items-start justify-between w-full mt-2 tems-center'>
          <div className='flex items-center'>
            <Image
              alt='Dzmitry Svirin'
              height={36}
              width={36}
              src='/svirins.png'
              className='rounded-full'
            />
            <p className='ml-2 text-xs md:text-sm lg:text-base text-gray-400'>
              <a
                className=' text-gray-300  font-medium link-underline link-underline-gradient'
                href='https://twitter.com/svirins'
              >
                Dzmitry Svirin
              </a>
              {` • `}
              {new Intl.DateTimeFormat('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              }).format(new Date(post.date))}
            </p>
          </div>
          <p className='text-xs md:text-sm lg:text-base text-gray-400 min-w-32'>
            {`${post.readingTime && 1} min read`}
          </p>
        </div>

        <div className='w-full max-w-2xl mt-4 prose prose-invert md:prose-lg'>
          {post.body.map((section) => {
            if (!section || Object.keys(section).length === 0) {
              return null;
            }
            return <BlockContent key={section._key} section={section} />;
          })}
        </div>
      </div>
    </article>
  );
}