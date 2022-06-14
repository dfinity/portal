import React from 'react';
import styles from './styles.module.css';
export default function IconExternalLink({ width = 13.5, height = 13.5 }) {
  return (
    <svg
      width={width}
      height={height}
      aria-hidden="true"
      className={styles.iconExternalLink}
      viewBox="0 -2 12 10"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M6.49513 2.56192L1.4379 2.56192L1.4379 1.22879H8.77107V8.56196L7.43794 8.56196L7.43794 3.50473L1.7 9.24266L0.757192 8.29986L6.49513 2.56192Z"
        fill="currentColor"
      />
    </svg>
  );
}
