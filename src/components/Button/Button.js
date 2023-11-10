import React from 'react';

import classNames from 'classnames';

import styles from './Button.module.scss';

export default function Button({
  children,
  className,
  ...buttonElementProps
}) {
  return (
    <button {...buttonElementProps} className={classNames(className, styles.button)}>
      {children}
    </button>
  );
}