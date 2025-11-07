import localFont from 'next/font/local';
import './globals.css';

const inter = localFont({
  src: [
    {
      path: './fonts/Inter/Inter-Regular.otf',
      weight: '400',
      style: 'normal',
    },
    {
      path: './fonts/Inter/Inter-Medium.otf',
      weight: '500',
      style: 'normal',
    },
    {
      path: './fonts/Inter/Inter-SemiBold.otf',
      weight: '600',
      style: 'normal',
    },
    {
      path: '/fonts/Inter/Inter-Bold.otf',
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
      <body className={inter.className}>{children}</body>
    </html>
  );
}
