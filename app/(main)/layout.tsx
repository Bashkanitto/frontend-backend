import localFont from 'next/font/local';
import '@/app/globals.css';
import RootContent from './RootContent';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <RootContent>{children}</RootContent>;
}
