'use client';

import { usePageStore } from '@/store/usePageStore';
import { useModalStore } from '@/store/useModalStore';
import { useState } from 'react';
import styles from './Sidebar.module.css';

type Page = 'home' | 'statistic' | 'add' | 'wallet' | 'settings';

type NavItem = {
  id: Page;
  label: string;
  icon: string;
};

export default function Sidebar() {
  const { openModal } = useModalStore();
  const { setPage } = usePageStore();

  const [isOpen, setIsOpen] = useState(true);
  const [activeItem, setActiveItem] = useState('home');
  const [isLogoHovered, setIsLogoHovered] = useState(false);

  const navItems: NavItem[] = [
    { id: 'home', label: 'Home', icon: '/home_icon.svg' },
    { id: 'statistic', label: 'Statistic', icon: '/statistic_icon.svg' },
    { id: 'add', label: 'Add', icon: '/plus_icon.svg' },
    { id: 'wallet', label: 'Wallet', icon: '/wallet_icon.svg' },
    { id: 'settings', label: 'Settings', icon: '/settings_icon.svg' },
  ];

  return (
    <div
      className={`${styles.sidebar} ${isOpen ? styles.open : styles.closed}`}
    >
      <div className={styles.topRow}>
        <div
          onMouseEnter={() => !isOpen && setIsLogoHovered(true)}
          onMouseLeave={() => setIsLogoHovered(false)}
          onClick={() => !isOpen && setIsOpen(true)}
          style={{ cursor: 'pointer', width: '32px', height: '32px' }}
        >
          <img
            src={
              !isOpen && isLogoHovered
                ? '/sidebarOpen_icon.svg'
                : '/logo_icon.svg'
            }
            alt="logo"
            className={`${styles.logo} ml-2`}
            style={{
              width: '25px',
              height: '25px',
              minWidth: '25px',
              minHeight: '25px',
            }}
          />
        </div>
        <img
          src="/sidebarClose_icon.svg"
          alt="close"
          className={styles.closeIcon}
          onClick={() => setIsOpen(false)}
        />
      </div>

      <div className={styles.profile}>
        <img
          src="/profile_icon.svg"
          alt="profile"
          className={styles.profileIcon}
          style={{
            width: '40px',
            height: '40px',
            minWidth: '40px',
            minHeight: '40px',
          }}
        />
        <div className={styles.profileText}>
          <span className={styles.profileName}>Иванов Иван</span>
          <span className={styles.profileCard}>Visa Debit *1000</span>
        </div>
      </div>

      <div className={styles.nav}>
        {navItems.map((item) => {
          const isActive = activeItem === item.id;
          return (
            <div
              key={item.id}
              className={`${styles.navItem} ${isActive ? styles.active : ''}`}
              onClick={() => {
                setActiveItem(item.id);
                if (item.id !== 'add')
                  setPage(item.id); // ← эта строка не даёт менять текст
                else openModal();
              }}
              data-label={item.label}
            >
              <img
                src={item.icon}
                alt={item.label}
                className={styles.navIcon}
              />
              <span>{item.label}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
