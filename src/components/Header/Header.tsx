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
              <a href="/home" className={styles.navLink}>
                Home
              </a>
            </li>
            <li>
              <a href="/about" className={styles.navLink}>
                About
              </a>
            </li>
            <li>
              <a href="/contact" className={styles.navLink}>
                Contact
              </a>
            </li>
          </ul>
        </nav>
        <div className={styles.headerButtons}>
          <a href="#" style={{ background: 'white', color: 'black' }}>
            Sign up
          </a>
          <a href="#" style={{ background: 'black', color: 'white' }}>
            Get started
          </a>
        </div>
      </div>
    </header>
  );
};

export default Header;
