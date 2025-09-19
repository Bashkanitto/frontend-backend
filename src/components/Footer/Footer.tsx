import React from 'react';
import { Facebook, Linkedin, Twitter, Instagram } from 'lucide-react';
import styles from './Footer.module.css';
import './Footer.module.css';

const Footer: React.FC = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerContainer}>
        <div className={styles.footerMainContent}>
          <div className={styles.footerTagline}>
            <span className={styles.taglineText}>Effortless Task Automation</span>
          </div>
          <h2 className={styles.footerHeading}>
            Based on 1,000+ G2 Ground reviews,
            <br />
            Mondai CRM is a game-changer
          </h2>
          <div className={styles.footerSignup}>
            <input type="email" placeholder="Your Email Address" className={styles.emailInput} />
            <button className={styles.getStartedBtn}>Get Started</button>
          </div>
        </div>

        <div className={styles.footerDivider}></div>

        <div className={styles.footerContent}>
          <div className={styles.companyInfo}>
            <div className={styles.logoSection}>
              <img src="/images/footer_logo.svg" alt="Lumora" />
            </div>
            <div className={styles.companyAddress}>
              <p>New York City, NY 123 Legal Avenue,</p>
              <p>Suite 456 New York, NY 10001</p>
            </div>
            <div className={styles.socialLinks}>
              <a href="#" className={styles.socialLink}>
                <Facebook size={18} />
              </a>
              <a href="#" className={styles.socialLink}>
                <Linkedin size={18} />
              </a>
              <a href="#" className={styles.socialLink}>
                <Twitter size={18} />
              </a>
              <a href="#" className={styles.socialLink}>
                <Instagram size={18} />
              </a>
            </div>
          </div>

          <div className={styles.navigationLinks}>
            <div className={styles.navColumn}>
              <ul className={styles.navList}>
                <li>
                  <a href="#" className={styles.navLink}>
                    Home
                  </a>
                </li>
                <li>
                  <a href="#" className={styles.navLink}>
                    About Us
                  </a>
                </li>
                <li>
                  <a href="#" className={styles.navLink}>
                    Contact
                  </a>
                </li>
                <li>
                  <a href="#" className={styles.navLink}>
                    Licensing
                  </a>
                </li>
              </ul>
            </div>

            <div className={styles.navColumn}>
              <ul className={styles.navList}>
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
            </div>

            <div className={styles.navColumn}>
              <ul className={styles.navList}>
                <li>
                  <a href="#" className={styles.navLink}>
                    Style Guide
                  </a>
                </li>
                <li>
                  <a href="#" className={styles.navLink}>
                    Changelog
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
