import '@/app/ui/global.css';
// import localFont from 'next/font/local';
import Footer from '@/app/ui/Footer';
import Header from '@/app/ui/Header';

// const plexSans = localFont({
//   src: [
//     {
//       path: './fonts/ibm-plex-sans-var.woff2',
//       weight: '400',
//       style: 'normal'
//     },
//     {
//       path: './fonts/ibm-plex-sans-var-italic.woff2',
//       weight: '400',
//       style: 'italic'
//     }
//   ]
// });
// // TODO: import plex-sans-mono at code blocks down to the components treee
// TODO: Wrap with 'next-themes'
export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={` antialiased bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100`}
      >
        <div className="bg-gray-50 dark:bg-gray-900">
          <Header />
          <main
            id="skip"
            className="flex flex-col justify-center px-8 bg-gray-50 dark:bg-gray-900"
          >
            {children}
            <Footer />
          </main>
        </div>
        ;
      </body>
    </html>
  );
}