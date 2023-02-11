`use client`;

import clsx from 'clsx';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

import { NAV_LINKS } from 'config';
import useDelayedRender from 'lib/use-delayed-render';
import styles from 'styles/mobile-menu.module.css';

//TODO: Consider removing useDelayedRender
export default function MobileMenu() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { mounted: isMenuMounted, rendered: isMenuRendered } = useDelayedRender(
    isMenuOpen,
    {
      enterDelay: 20,
      exitDelay: 300
    }
  );
  const path = usePathname();

  function toggleMenu() {
    if (isMenuOpen) {
      setIsMenuOpen(false);
      document.body.style.overflow = '';
    } else {
      setIsMenuOpen(true);
      document.body.style.overflow = 'hidden';
    }
  }

  useEffect(() => {
    return function cleanup() {
      document.body.style.overflow = '';
    };
  }, []);

  return (
    <>
      <button
        className={clsx(styles.burger, 'visible md:hidden')}
        aria-label='Toggle menu'
        type='button'
        onClick={toggleMenu}
      >
        <MenuIcon data-hide={isMenuOpen} />
        <CrossIcon data-hide={!isMenuOpen} />
      </button>
      {isMenuMounted && (
        <ul
          className={clsx(
            styles.menu,
            'flex flex-col absolute bg-gray-900',
            isMenuRendered && styles.menuRendered
          )}
        >
          {NAV_LINKS.map((item, index) => (
            <li
              key={index}
              className='border-0 text-gray-400 border-gray-500/50'
              style={{ transitionDelay: '150ms' }}
            >
              <Link
                href={item.href}
                className={clsx(
                  'transition-all  duration-150  hover:text-gray-200 ease-in-out text-lg',
                  {
                    'font-medium text-gray-200': path === item.href,
                    '': path !== item.href
                  }
                )}
              >
                {item.text}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </>
  );
}

function MenuIcon(props: JSX.IntrinsicElements['svg']) {
  return (
    <svg
      className='h-5 w-5 absolute text-gray-200 hover:text-gray-100'
      width='20'
      height='20'
      viewBox='0 0 20 20'
      fill='none'
      {...props}
    >
      <path
        d='M2.5 4.5h15m-15 6h15m-15 6h15'
        stroke='currentColor'
        strokeWidth='1.5'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </svg>
  );
}

function CrossIcon(props: JSX.IntrinsicElements['svg']) {
  return (
    <svg
      className='h-5 w-5 absolute text-gray-100'
      viewBox='0 0 24 24'
      width='24'
      height='24'
      stroke='currentColor'
      strokeWidth='1.5'
      strokeLinecap='round'
      strokeLinejoin='round'
      fill='none'
      shapeRendering='geometricPrecision'
      {...props}
    >
      <path d='M18 6L6 18' />
      <path d='M6 6l12 12' />
    </svg>
  );
}