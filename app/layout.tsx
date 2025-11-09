import localFont from 'next/font/local';
import './globals.css';
import Sidebar from '@/components/Sidebar';
import Header from '@/components/Header';

const inter = localFont({
  src: [
    {
      path: '../public/fonts/Inter-Regular.otf',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../public/fonts/Inter-Medium.otf',
      weight: '500',
      style: 'normal',
    },
    {
      path: '../public/fonts/Inter-SemiBold.otf',
      weight: '600',
      style: 'normal',
    },
    {
      path: '../public/fonts/Inter-Bold.otf',
      weight: '700',
      style: 'normal',
    },
  ],
  variable: '--font-inter',
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.className} flex w-full h-screen bg-[var(--background)] text-[var(--foreground)]`}
      >
        <Sidebar />
        <div className="w-full">
          <Header />
          <main className="p-6 overflow-y-auto">{children}</main>
        </div>
      </body>
    </html>
  );
}
