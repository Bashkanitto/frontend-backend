import arrow from '../../../public/images/arrow-right.svg';
import styles from './Banner.module.css';

type BannerProps = {
  title: string;
  subtitle?: string;
  buttonText: string;
  leftIcon?: string;
  rightImage?: string;
};

function Banner({ title, subtitle, buttonText, leftIcon, rightImage }: BannerProps) {
  return (
    <div className={styles.paddingGlobal}>
      <div className={styles.banner}>
        <div className={styles.bannerLeft}>
          {leftIcon && (
            <div className={styles.whiteCircle}>
              <img src={leftIcon} alt="icon" />
            </div>
          )}
          <h2>{title}</h2>
          <button className={styles.bannerButton}>
            <p className={styles.bannerButtonText}>{buttonText}</p>
            <div className={`${styles.whiteCircle} ${styles.whiteCircleSmall}`}>
              <img src={arrow} />
            </div>
          </button>
        </div>

        <div className={styles.bannerRight}>
          {rightImage && <img src={rightImage} alt="banner" />}
        </div>
      </div>
    </div>
  );
}

export default Banner;
