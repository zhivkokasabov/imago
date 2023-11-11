import React from 'react';

import classNames from 'classnames';

import styles from './Button.module.scss';

export default function Button({
  children,
  className,
  variant,
  ...buttonElementProps
}) {
  return (
    <button {...buttonElementProps} className={classNames(className, styles.button, styles[`button__${variant}`])}>
      {children}
    </button>
  );
}