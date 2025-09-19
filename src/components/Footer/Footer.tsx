import React from 'react';
import { Facebook, Linkedin, Twitter, Instagram } from 'lucide-react';
import './Footer.css';
import { color } from 'framer-motion';

const Footer: React.FC = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-main-content">
          <div className="footer-tagline">
            <span className="tagline-text">Effortless Task Automation</span>
          </div>
          <h2 className="footer-heading">
            Based on 1,000+ G2 Ground reviews,
            <br />
            Mondai CRM is a game-changer
          </h2>
          <div className="footer-signup">
            <input type="email" placeholder="Your Email Address" className="email-input" />
            <button className="get-started-btn">Get Started</button>
          </div>
        </div>

        <div className="footer-divider"></div>

        <div className="footer-content">
          <div className="company-info">
            <div className="logo-section">
              <img src="/images/footer_logo.svg" alt="Lumora" />
            </div>
            <div className="company-address">
              <p>New York City, NY 123 Legal Avenue,</p>
              <p>Suite 456 New York, NY 10001</p>
            </div>
            <div className="social-links">
              <a href="#" className="social-link">
                <Facebook size={18} />
              </a>
              <a href="#" className="social-link">
                <Linkedin size={18} />
              </a>
              <a href="#" className="social-link">
                <Twitter size={18} />
              </a>
              <a href="#" className="social-link">
                <Instagram size={18} />
              </a>
            </div>
          </div>

          <div className="navigation-links">
            <div className="nav-column">
              <ul className="nav-list">
                <li>
                  <a href="#" className="nav-link">
                    Home
                  </a>
                </li>
                <li>
                  <a href="#" className="nav-link">
                    About Us
                  </a>
                </li>
                <li>
                  <a href="#" className="nav-link">
                    Contact
                  </a>
                </li>
                <li>
                  <a href="#" className="nav-link">
                    Licensing
                  </a>
                </li>
              </ul>
            </div>

            <div className="nav-column">
              <ul className="nav-list">
                <li>
                  <a href="#" className="nav-link">
                    Pricing
                  </a>
                </li>
                <li>
                  <a href="#" className="nav-link">
                    Features
                  </a>
                </li>
                <li>
                  <a href="#" className="nav-link">
                    Blogs
                  </a>
                </li>
                <li>
                  <a href="#" className="nav-link">
                    Blog Post
                  </a>
                </li>
              </ul>
            </div>

            <div className="nav-column">
              <ul className="nav-list">
                <li>
                  <a href="#" className="nav-link">
                    Style Guide
                  </a>
                </li>
                <li>
                  <a href="#" className="nav-link">
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
