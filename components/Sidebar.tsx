'use client';

import { usePageStore, useSidebarState } from '@/store/usePageStore';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useModalStore } from '@/store/useModalStore';

type Page = 'home' | 'statistic' | 'add' | 'wallet' | 'categories';

type NavItem = {
  id: Page;
  label: string;
  icon: string;
};

export default function Sidebar() {
  const router = useRouter();

  const { setPage } = usePageStore();
  const { isSidebarOpen, toggleSidebarState } = useSidebarState();

  const [selectedItem, setSelectedItem] = useState('home');
  const [isLogoHovered, setIsLogoHovered] = useState(false);
  const [hasMounted, setHasMounted] = useState(false);

  const { isOpen, openModal, closeModal } = useModalStore();

  useEffect(() => {
    const timer = setTimeout(() => setHasMounted(true), 0);
    return () => clearTimeout(timer);
  }, []);

  const navItems: NavItem[] = [
    { id: 'home', label: 'Home', icon: '/icons/home_icon.svg' },
    { id: 'statistic', label: 'Statistic', icon: '/icons/statistic_icon.svg' },
    { id: 'add', label: 'Add', icon: '/icons/plus_icon.svg' },
    { id: 'wallet', label: 'Wallet', icon: '/icons/wallet_icon.svg' },
    { id: 'categories', label: 'Categories', icon: '/icons/file_icon.svg' },
  ];

  return (
    <div
      className={`bg-[var(--accent-bg)] shadow-sm rounded-tr-lg rounded-br-lg sidebar relative flex flex-col justify-between ${
        isSidebarOpen ? `w-[250px]` : `w-[60px]`
      } ${hasMounted ? 'transition-all duration-300' : ''}`}
    >
      <div>
        <div className="py-4 flex justify-between items-center ml-1">
          <div
            className="w-13 h-13 flex justify-center items-center hover:bg-[var(--secondary-bg)] rounded-xl p-2 cursor-pointer"
            onMouseEnter={() => !isSidebarOpen && setIsLogoHovered(true)}
            onMouseLeave={() => setIsLogoHovered(false)}
            onClick={() => toggleSidebarState()}
          >
            <Image
              className={
                isLogoHovered
                  ? 'm-[5px] transition-all duration-300'
                  : 'transition-all duration-300'
              }
              alt="logo"
              src={
                isLogoHovered
                  ? '/icons/sidebarClose_icon.svg'
                  : '/icons/logo_icon.svg'
              }
              width={isLogoHovered ? 30 : 40}
              height={isLogoHovered ? 30 : 40}
              unselectable="on"
            />
          </div>
          <div
            className={`absolute right-1 w-10 h-10 flex justify-center items-center rounded-xl cursor-pointer transition-opacity duration-300 ${
              isSidebarOpen
                ? 'opacity-100 hover:bg-[var(--secondary-bg)]'
                : 'opacity-0 pointer-events-none'
            }`}
            onClick={toggleSidebarState}
          >
            <Image
              alt="toggle_icon"
              src={'/icons/sidebarClose_icon.svg'}
              width={30}
              height={30}
              className={`transition-opacity duration-300 ${
                isSidebarOpen ? 'opacity-100' : 'opacity-0'
              }`}
              unselectable="on"
            />
          </div>
        </div>

        <div className="flex flex-col gap-1 mx-1">
          {navItems.map((item, index) => (
            <div
              key={item.id}
              className={`hover:bg-[var(--secondary-bg)] h-13 flex items-center pl-2 rounded-xl cursor-pointer`}
              onClick={() => {
                if (item.id === 'add') {
                  openModal('add');
                } else {
                  router.push(`/${item.id}`);
                  setPage(item.id);
                  setSelectedItem(item.id);
                }
              }}
            >
              <div className="w-[30px] h-[30px] ml-[4px] flex items-center justify-center flex-shrink-0">
                <Image
                  src={item.icon}
                  alt="icon"
                  width={30}
                  height={30}
                  unselectable="on"
                />
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
                {item.label}
              </span>
            </div>
          ))}
        </div>
      </div>

      <div
        className="mb-4 py-2 mr-1 ml-[6px] px-1 flex hover:bg-[var(--secondary-bg)] rounded-xl items-center cursor-pointer"
        onClick={() =>
          isOpen('profileModal')
            ? closeModal('profileModal')
            : openModal('profileModal')
        }
      >
        <div className="w-[40px] h-[40px] flex items-center justify-center flex-shrink-0">
          <Image
            src={'/icons/profile_icon.svg'}
            alt="profile_icon"
            width={40}
            height={40}
            unselectable="on"
          />
        </div>
        <div className="flex flex-col ml-2 overflow-hidden">
          <span
            className={`text-[var(--accent-text)] font-bold whitespace-nowrap transition-all duration-300 ease-in-out text-[20px] pb-1 select-none ${
              isSidebarOpen
                ? 'opacity-100 translate-x-0'
                : 'opacity-0 -translate-x-2 pointer-events-none'
            }`}
          >
            Иван Иванов
          </span>
          <span
            className={`text-[var(--secondary-text)] font-bold whitespace-nowrap transition-all duration-300 ease-in-out select-none ${
              isSidebarOpen
                ? 'opacity-100 translate-x-0'
                : 'opacity-0 -translate-x-2 pointer-events-none'
            }`}
          >
            Visa Debit *1000
          </span>
        </div>
      </div>
    </div>
  );
}
