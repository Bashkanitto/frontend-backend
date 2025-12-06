'use client';

import { useState, useEffect } from 'react';
import { usePageStore, useSidebarState } from '@/store/usePageStore';
import { useRouter, usePathname } from 'next/navigation';
import { useModalStore } from '@/store/useModalStore';
import { useAuthStore } from '@/store/useAuthStore';
import { useSettingsStore } from '@/store/useSettingsStore';
import { translations } from '@/lib/translations';
import {
  Home,
  BarChart3,
  FileText,
  Wallet,
  Tag,
  User,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';
import Image from 'next/image';

type Page = 'home' | 'statistic' | 'transactions' | 'wallet' | 'categories';

type NavItem = {
  id: Page;
  label: string;
  labelRu: string;
  icon: React.ComponentType<{ className?: string }>;
};

export default function Sidebar() {
  const router = useRouter();
  const pathname = usePathname();
  const { setPage } = usePageStore();
  const { isSidebarOpen, toggleSidebarState } = useSidebarState();
  const { user, isAuthenticated } = useAuthStore();
  const { language } = useSettingsStore();
  const t = translations[language];
  const [selectedItem, setSelectedItem] = useState('home');
  const [isLogoHovered, setIsLogoHovered] = useState(false);
  const [hasMounted, setHasMounted] = useState(false);
  const { openModal } = useModalStore();

  useEffect(() => {
    const timer = setTimeout(() => setHasMounted(true), 0);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const currentPath = pathname.split('/')[1] || 'home';
    setSelectedItem(currentPath);
  }, [pathname]);

  const navItems: NavItem[] = [
    { id: 'home', label: 'Home', labelRu: 'Главная', icon: Home },
    {
      id: 'statistic',
      label: 'Statistics',
      labelRu: 'Статистика',
      icon: BarChart3,
    },
    {
      id: 'transactions',
      label: 'Transactions',
      labelRu: 'Транзакции',
      icon: FileText,
    },
    { id: 'wallet', label: 'Wallet', labelRu: 'Кошельки', icon: Wallet },
    { id: 'categories', label: 'Categories', labelRu: 'Категории', icon: Tag },
  ];

  const handleProfileClick = () => {
    if (isAuthenticated) {
      openModal('profileMenu');
    } else {
      router.push('/login');
    }
  };

  return (
    <div
      className={`bg-card shadow-sm rounded-tr-lg rounded-br-lg sidebar relative flex flex-col justify-between border-r ${
        isSidebarOpen ? `w-[250px]` : `w-[60px]`
      } ${hasMounted ? 'transition-all duration-300' : ''}`}
    >
      <div>
        <div className="py-4 flex justify-between items-center ml-1">
          <div
            className="w-13 h-13 flex justify-center items-center hover:bg-secondary rounded-xl p-2 cursor-pointer"
            onMouseEnter={() => !isSidebarOpen && setIsLogoHovered(true)}
            onMouseLeave={() => setIsLogoHovered(false)}
            onClick={() => toggleSidebarState()}
          >
            {isLogoHovered ? (
              <ChevronRight className="w-6 h-6 transition-all duration-300" />
            ) : (
              <Image
                src="/icons/logo_icon.svg"
                alt="Void Logo"
                width={24}
                height={24}
                className="transition-all duration-300"
              />
            )}
          </div>
          <div
            className={`absolute right-1 w-10 h-10 flex justify-center items-center rounded-xl cursor-pointer transition-opacity duration-300 ${
              isSidebarOpen
                ? 'opacity-100 hover:bg-secondary'
                : 'opacity-0 pointer-events-none'
            }`}
            onClick={toggleSidebarState}
          >
            <ChevronLeft
              className={`w-5 h-5 transition-opacity duration-300 ${
                isSidebarOpen ? 'opacity-100' : 'opacity-0'
              }`}
            />
          </div>
        </div>

        <div className="flex flex-col gap-1 mx-1">
          {navItems.map((item, index) => {
            const IconComponent = item.icon;
            const isActive = selectedItem === item.id;
            return (
              <div
                key={item.id}
                className={`h-13 flex items-center pl-2 rounded-xl cursor-pointer transition-colors ${
                  isActive
                    ? 'bg-primary text-primary-foreground'
                    : 'hover:bg-secondary'
                }`}
                onClick={() => {
                  router.push(`/${item.id}`);
                  setPage(item.id);
                  setSelectedItem(item.id);
                }}
              >
                <div className="w-[30px] h-[30px] ml-[4px] flex items-center justify-center flex-shrink-0">
                  <IconComponent className="w-5 h-5" />
                </div>
                <span
                  className={`ml-3 whitespace-nowrap transition-all duration-300 select-none ${
                    isSidebarOpen
                      ? 'opacity-100 translate-x-0'
                      : 'opacity-0 -translate-x-2 pointer-events-none'
                  }`}
                  style={{
                    transitionDelay: isSidebarOpen ? `${index * 50}ms` : '0ms',
                  }}
                >
                  {language === 'ru' ? item.labelRu : item.label}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      <div
        className="mb-4 py-2 mr-1 ml-[6px] px-1 flex hover:bg-secondary rounded-xl items-center cursor-pointer"
        onClick={handleProfileClick}
      >
        <div className="w-[40px] h-[40px] flex items-center justify-center flex-shrink-0">
          <User className="w-6 h-6" />
        </div>

        {isAuthenticated && user ? (
          <div className="flex flex-col ml-2 overflow-hidden">
            <span
              className={`font-bold whitespace-nowrap transition-all duration-300 ease-in-out text-[20px] pb-1 select-none ${
                isSidebarOpen
                  ? 'opacity-100 translate-x-0'
                  : 'opacity-0 -translate-x-2 pointer-events-none'
              }`}
            >
              {user.username}
            </span>
            <span
              className={`text-muted-foreground font-bold whitespace-nowrap transition-all duration-300 ease-in-out select-none text-sm ${
                isSidebarOpen
                  ? 'opacity-100 translate-x-0'
                  : 'opacity-0 -translate-x-2 pointer-events-none'
              }`}
            >
              {user.email}
            </span>
          </div>
        ) : (
          <span
            className={`ml-2 font-bold transition-all duration-300 ease-in-out select-none ${
              isSidebarOpen
                ? 'opacity-100 translate-x-0'
                : 'opacity-0 -translate-x-2 pointer-events-none'
            }`}
          >
            {t.signIn}
          </span>
        )}
      </div>
    </div>
  );
}
