import React from 'react';
import styles from './ProgressBar.module.scss';

interface ProgressBarProps {
    value?: number;
    className?: string
}

const ProgressBar: React.FC<ProgressBarProps> = ({ value = 0, className}) => {
    return (
        <div className={styles.progressBar}>
            <div
                className={`${styles.progress} ${className}`}
                style={{ width: `${value}%` }}
            ></div>
        </div>
    );
};

export default ProgressBar;