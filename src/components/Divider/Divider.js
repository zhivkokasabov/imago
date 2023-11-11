import React from 'react';

import classNames from 'classnames';

import styles from './Divider.module.scss';

export default function Button({ className, variant = 'dark' }) {
  return (
    <div className={classNames(styles[`divider__${variant}`], styles.divider, className)} />
  );
}