// app/RootContent.tsx (клиентский)
'use client';
import Sidebar from '@/components/Sidebar';
import Header from '@/components/Header';
import Modal from '@/components/Modal';
import ProfileModal from '@/components/ProfileModal';

export default function RootContent({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex w-full h-screen">
      <Sidebar />
      <div className="flex flex-col flex-1 h-full pt-5">
        <Header />
        <Modal />
        <ProfileModal />
        <main className="flex-1 p-6">{children}</main>
      </div>
    </div>
  );
}
