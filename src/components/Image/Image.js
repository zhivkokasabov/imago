import React from 'react';

import classNames from 'classnames';

import styles from './Image.module.scss';

export default function Image({
  omitDomain,
  ...imgElementAttributes
}) {
  return <img
    {...imgElementAttributes}
    src={omitDomain ? imgElementAttributes.src : `${process.env.CDN}${imgElementAttributes.src}`}
    className={classNames(imgElementAttributes.className, styles.image)}
  />;
}
