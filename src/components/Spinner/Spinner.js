import React from 'react';

import styles from './Spinner.module.scss';

export default function Spinner({
  show
}) {
  if (!show) {
    return null;
  }

  return (
    <div className={styles.spinner}>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  );
}