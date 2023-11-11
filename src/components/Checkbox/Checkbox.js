import React from 'react';

import styles from './Checkbox.module.scss';

import classNames from 'classnames';

export default function Checkbox({ active, className }) {
  return (
    <span className={classNames(styles.checkbox, active ? styles['checkbox--active'] : '', className)}>
      <span />
    </span>
  );
}