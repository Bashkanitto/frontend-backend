import localFont from 'next/font/local';
import '@/app/globals.css';

const inter = localFont({
  src: [
    {
      path: '../../public/fonts/Inter-Regular.otf',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../../public/fonts/Inter-Medium.otf',
      weight: '500',
      style: 'normal',
    },
    {
      path: '../../public/fonts/Inter-SemiBold.otf',
      weight: '600',
      style: 'normal',
    },
    {
      path: '../../public/fonts/Inter-Bold.otf',
      weight: '700',
      style: 'normal',
    },
  ],
  variable: '--font-inter',
});

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.className}>
      <body>
        <main className="w-full h-screen flex justify-center items-center bg-gray-100">
          {children}
        </main>{' '}
        {/* Без сайдбаров, хедеров и всего остального */}
      </body>
    </html>
  );
}
