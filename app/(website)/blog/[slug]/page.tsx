import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import { font_mono } from 'fonts';
import { getPost, getPostSlugs } from 'lib/sanity-api';
import { Tags } from 'components/Tags';
import BlockContent from 'components/BlockContent';
import { createRemoteImageAttributes } from 'lib/createRemoteImageAttributes.ts';
import Balancer from 'react-wrap-balancer';

export async function generateStaticParams() {
  const paths = await getPostSlugs();
  return paths.map((slug) => ({ slug: slug }));
}

export async function generateMetadata({
  params
}: {
  params: any;
}): Promise<Metadata | undefined> {
  const post = await getPost(params.slug);
  if (!post) {
    return;
  }
  // todo: add og generation logic
  const {
    title,
    publishedAt: publishedTime,
    summary: description,
    image,
    slug
  } = post;

  const ogImage = image;
  // ? `https://svirins.codes${image}`
  // : `https://svirins.codes/api/og?title=${title}`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: 'article',
      publishedTime,
      url: `https://svirins.codes/blog/${slug}`,
      images: [
        {
          url: ogImage
        }
      ]
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [ogImage]
    }
  };
}

export default async function PostPage({
  params
}: {
  params: {
    slug: string;
  };
}) {
  const post = await getPost(params.slug);
  if (!post) {
    return notFound();
  }
  const { width, height, img } = createRemoteImageAttributes(post.imageWithAlt);

  return (
    <article className='container items-start justify-center pb-4'>
      <div className={font_mono.variable}>
        <h1 className='page-header'>
          <Balancer ratio={0.65}>{post.title}</Balancer>
        </h1>
        <Tags tags={post.tags} />
        {post.imageWithAlt && (
          <div className='flex flex-col w-full my-4'>
            <Image
              src={img}
              alt={post.imageWithAlt.alt}
              width={width}
              height={height}
              quality='100'
              className='rounded-lg h-auto w-auto'
              priority={true}
              placeholder='blur'
              blurDataURL={post.imageWithAlt.lqip}
            />
          </div>
        )}
        <div className='flex flex-row items-start justify-between w-full mt-2'>
          <div className='flex items-center'>
            <Image
              alt='Dzmitry Svirin'
              height={48}
              width={48}
              quality='100'
              src='/svirins-light-small.webp'
              className='rounded-full'
            />
            <p className='ml-2 text-sm md:text-base  text-gray-400'>
              <a
                className=' text-gray-300  link-underline link-underline-gradient'
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
            </p>{' '}
            <p className='text-sm md:text-base text-gray-400 min-w-32'>
              {`${post.readingTime && 1} min read`}
            </p>
          </div>
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
