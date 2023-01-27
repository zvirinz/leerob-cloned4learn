import Link from 'next/link';
('use client');
import { IconContext } from 'react-icons';
import StackIcon from 'ui/StackIcon';

export default function SnippetPreview({
  title,
  description,
  slug,
  iconTitle,
  ...rest
}) {
  return (
    <Link
      href={`/snippets/${slug}`}
      className="p-4 w-full border border-gray-400 dark:border-gray-700 rounded  transition-all   hover:border-active/50 dark:hover:border-active/50 duration-150 ease-in-out [&>h3]:  [&>h3]:hover:text-active"
      {...rest}
    >
      <div className="pb-2 float-right  scale-125 md:scale-150 ml-4 origin-centers pr-2 pt-2">
        <IconContext.Provider
          value={{
            className: 'w-7 h-7 md:w-8 md:h-8 fill-gray-900  dark:fill-gray-100'
          }}
        >
          <StackIcon iconTitle={iconTitle!} />
        </IconContext.Provider>
      </div>
      <h3 className="text-xl md:text-2xl font-medium text-left text-gray-900  hover:text-active dark:hover:text-active dark:text-gray-100">
        {title}
      </h3>
      <p className="text-gray-700 dark:text-gray-400 pt-2  md:text-lg">
        {description}
      </p>
    </Link>
  );
}
