import { useState, useEffect } from 'react';
import styles from './Banner.module.scss';

interface BannerProps {
  title: string;
  subtitle: string | React.ReactNode;
  duration?: number;
  onClose?: () => void;
}

function Banner(props: BannerProps) {
  const { duration = 2000, title, subtitle, onClose } = props

  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const hideTimer = setTimeout(() => {
      setVisible(false)
      if (onClose) {
        onClose();
      }
    }, duration);

    return () => {
      clearTimeout(hideTimer);
    };
  }, [duration, onClose]);

  const bannerStyles: React.CSSProperties = {
    opacity: visible ? 1 : 0,
    animation: `
      slideDown 0.5s ease-out,
      slideUp 0.5s ease-in ${duration / 1000 - 0.5}s forwards`,
  };

  const keyframesStyles = `
    @keyframes slideDown {
      0% {
        transform: translate(-50%, -100%);
        opacity: 0;
      }
      100% {
        transform: translate(-50%, 0);
        opacity: 1;
      }
    }

    @keyframes slideUp {
      0% {
        transform: translate(-50%, 0);
        opacity: 1;
      }
      100% {
        transform: translate(-50%, -100%);
        opacity: 0;
      }
    }
  `;

  return (
    <div>
      <style>{keyframesStyles}</style>
      <div className={styles.banner} style={bannerStyles}>
        <div className={styles.title}>{title}</div>
        <div className={styles.subtitle}>{subtitle}</div>
      </div>
    </div>
  );
};

export default Banner;
