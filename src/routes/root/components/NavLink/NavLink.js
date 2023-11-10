import React from 'react';
import { Link } from 'react-router-dom';

import styles from './NavLink.module.scss';

import classNames from 'classnames';

export default function NavLink({
  href,
  text,
  className
}) {
  return <Link
    className={classNames(className, styles.link)}
    to={href}
  >
    {text}
  </Link>;
}