'use client';
import { useEffect, useState } from 'react';
import { useSettingsStore } from '@/store/useSettingsStore';
import Sidebar from '@/components/Sidebar';
import Header from '@/components/Header';
import Modal from '@/components/Modal';
import ProfileModal from '@/components/ProfileModal';

export default function RootContent({
  children,
}: {
  children: React.ReactNode;
}) {
  const themeMode = useSettingsStore((state) => state.themeMode);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Добавь это для отладки
  useEffect(() => {
    console.log('🎨 Current themeMode:', themeMode);
    console.log('🔧 Mounted:', mounted);
  }, [themeMode, mounted]);

  const getThemeClass = () => {
    if (!mounted) return 'colors';
    
    if (themeMode === 'light') return 'colors-light';
    if (themeMode === 'dark') return 'colors-dark';
    return 'colors';
  };

  const themeClass = getThemeClass();
  
  // Еще одна проверка
  console.log('📦 Final class:', themeClass);

  return (
    <div className={`${themeClass} flex w-full h-screen bg-[var(--background)]`}>
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