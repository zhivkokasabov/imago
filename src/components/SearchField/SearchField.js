import React from 'react';

import styles from './SearchField.module.scss';

import classNames from 'classnames';

import Button from '../Button/Button';
import ClearIcon from '../../icons/ClearIcon';

export default function SearchField({
  onChange,
  onClear,
  onKeyDown,
  defaultValue = '',
  placeholder,
  showClear,
  className
}) {
  return <div className={classNames(styles['search-field'], className)}>
    <input
      placeholder={placeholder}
      className={styles['search-field__input']}
      defaultValue={defaultValue}
      onChange={onChange}
      onKeyDown={onKeyDown}
    />
    {
      showClear
        ? (
          <Button onClick={onClear} type="submit" className={styles['search-field__button']}>
            <ClearIcon width={24} height={24} />
          </Button>
        )
        : (null)
    }
  </div>;
}
