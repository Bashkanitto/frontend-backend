import Header from '../Header/Header';
import styles from './Hero.module.css';

// App.tsx
function Hero() {
  return (
    <div className={styles.hero}>
      <Header />
      <p className={styles.trend}>1# Product of the day</p>
      <h1>Lumora Webflow Template</h1>
      <p className={styles.subTitle}>Presenting Lumora, The ultimate SaaS Webflow Template</p>
      <button>Customize template</button>
      <button style={{ background: 'white', color: 'black' }}>Buy now</button>
      <img src="/images/hero.png" alt="hero image" />
    </div>
  );
}

export default Hero;
