import React from 'react';
import styles from './Features.module.css';

const Features = () => {
  return (
    <div className={styles.features}>
      <p>Features</p>
      <h2>What is included Lumora</h2>
      <p>Lumora Webflow Template includes over 12 pages in total, with more than 25 sections.</p>
      <div className={styles.grid}>
        <div className="card">
          <img style={{ height: '400px' }} src="/images/feature1.avif" alt="feature card" />
        </div>
        <div className="card">
          <img style={{ height: '400px' }} src="/images/feature1.avif" alt="feature card" />
        </div>
        <div className="card">
          <img style={{ height: '400px' }} src="/images/feature1.avif" alt="feature card" />
        </div>
        <div className="card">
          <img style={{ height: '400px' }} src="/images/feature1.avif" alt="feature card" />
        </div>
      </div>
    </div>
  );
};

export default Features;
