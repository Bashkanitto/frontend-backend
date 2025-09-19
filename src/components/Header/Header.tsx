import React from 'react';
import styles from './Header.module.css';

const Header: React.FC = () => {
  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <div className={styles.logo}>
          <img src="/images/logo.svg" alt="Логотип сайта" />
        </div>

        <nav>
          <ul>
            <li>
              <a href="#" className={styles.navLink}>
                Pricing
              </a>
            </li>
            <li>
              <a href="#" className={styles.navLink}>
                Features
              </a>
            </li>
            <li>
              <a href="#" className={styles.navLink}>
                Blogs
              </a>
            </li>
            <li>
              <a href="#" className={styles.navLink}>
                Blog Post
              </a>
            </li>
          </ul>
        </nav>
        <div className={styles.headerButtons}>
          <a href="#">Sign up</a>
          <a href="#">Get started</a>
        </div>
      </div>
    </header>
  );
};

export default Header;
