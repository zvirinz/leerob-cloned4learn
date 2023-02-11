import Link from 'next/link';
import { ITag } from 'lib/sanity-api';

export function Tags({ tags }: { tags: ITag[] }) {
  return (
    <div className='flex flex-wrap w-full md:pb-2'>
      {tags &&
        tags.map((tag) => (
          <Link
            key={tag.slug}
            href={`/tags/${tag.slug}`}
            className='mr-2 text-sm md:text-base font-medium text-gray-300 link-underline link-underline-gradient lowercase'
          >
            {`#${tag.title}`}
          </Link>
        ))}
    </div>
  );
}
