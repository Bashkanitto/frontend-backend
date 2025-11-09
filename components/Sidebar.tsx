'use client';

import { useState } from 'react';
import styles from './Sidebar.module.css';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

type Page = 'home' | 'statistic' | 'add' | 'wallet' | 'settings';

type NavItem = {
  id: Page;
  label: string;
  icon: string;
  link: string;
};

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(true);
  const pathname = usePathname().replace('/', '');
  const [isLogoHovered, setIsLogoHovered] = useState(false);

  const navItems: NavItem[] = [
    { id: 'home', label: 'Home', icon: 'icons/home_icon.svg', link: '/home' },
    {
      id: 'statistic',
      label: 'Statistic',
      icon: 'icons/statistic_icon.svg',
      link: '/statistic',
    },
    { id: 'add', label: 'Add', icon: 'icons/plus_icon.svg', link: '#' },
    {
      id: 'wallet',
      label: 'Wallet',
      icon: 'icons/wallet_icon.svg',
      link: '/wallet',
    },
    {
      id: 'settings',
      label: 'Settings',
      icon: 'icons/settings_icon.svg',
      link: '/settings',
    },
  ];

  return (
    <div
      className={`${styles.sidebar} ${isOpen ? styles.open : styles.closed}`}
    >
      <div className={styles.container}>
        <div className={styles.topRow}>
          <div
            onMouseEnter={() => !isOpen && setIsLogoHovered(true)}
            onMouseLeave={() => setIsLogoHovered(false)}
            onClick={() => !isOpen && setIsOpen(true)}
            style={{ cursor: 'pointer', width: '32px', height: '32px' }}
          >
            <Image
              width={25}
              height={25}
              src={
                !isOpen && isLogoHovered
                  ? 'icons/sidebarOpen_icon.svg'
                  : 'icons/logo_icon.svg'
              }
              alt="logo"
              className={`${styles.logo} ml-2`}
            />
          </div>
          <Image
            width={24}
            height={24}
            src="icons/sidebarClose_icon.svg"
            alt="close"
            className={styles.closeIcon}
            onClick={() => setIsOpen(false)}
          />
        </div>

        <div className={styles.profile}>
          <Image
            width={40}
            height={40}
            src="icons/profile_icon.svg"
            alt="profile"
            className={styles.profileIcon}
          />
          <div className={styles.profileText}>
            <span className={styles.profileName}>Иванов Иван</span>
            <span className={styles.profileCard}>Visa Debit *1000</span>
          </div>
        </div>

        <div className={styles.nav}>
          {navItems.map((item) => {
            return (
              <Link
                href={item.link}
                key={item.id}
                className={`${styles.navItem} ${pathname === item.label.toLowerCase() ? styles.active : ''}`}
              >
                <Image
                  width={24}
                  height={24}
                  src={item.icon}
                  alt={item.label}
                  className={styles.navIcon}
                />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
