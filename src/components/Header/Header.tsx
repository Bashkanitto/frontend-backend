import React from 'react';
import styles from './Header.module.css';
import FadeInWrapper from '../../utils/FadeInWrapper';

const Header: React.FC = () => {
  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <FadeInWrapper time={0.6}>
          <a href="/" className={styles.logo}>
            <img src="/images/logo.svg" alt="Логотип сайта" />
          </a>
        </FadeInWrapper>

        <FadeInWrapper time={0.8}>
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
        </FadeInWrapper>

        <FadeInWrapper time={1}>
          <div className={styles.headerButtons}>
            <a href="#" style={{ background: 'white', color: 'black' }}>
              Sign up
            </a>
            <a href="#" style={{ background: 'black', color: 'white' }}>
              Get started
            </a>
          </div>
        </FadeInWrapper>
      </div>
    </header>
  );
};

export default Header;
