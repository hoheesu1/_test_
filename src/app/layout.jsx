import localFont from 'next/font/local';
import './globals.css';
import Carousel from '@/components/layout/banner/Carousel';
import SideNav from '@/components/layout/aside/SideNav';
import ApolloUploadSetting from '@/commons/settings/apollo-setting';

const suit = localFont({
  src: '../../public/fonts/SUIT-Variable.woff2',
  variable: '--font-geist-sans',
  weight: '100 900',
});

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        // style={{ fontFamily: 'var(--font-geist-sans)' }}
        className={`${suit.variable} antialiased flex gap-5 py-[30px] px-5`}>
        <ApolloUploadSetting>
          <aside className="w-[200px] shrink-0 shadow-[0px_5px_10px_0px_rgba(0,0,0,0.05)] rounded-[10px]">
            <SideNav />
          </aside>
          <main className="flex-grow min-w-0">
            <Carousel />
            {children}
          </main>
        </ApolloUploadSetting>
      </body>
    </html>
  );
}
