import React, { useState } from 'react';

import styles from './SearchField.module.scss';

import classNames from 'classnames';

import Button from '../Button/Button';
import ClearIcon from '../../icons/ClearIcon';

export default function SearchField({
  onChange: propOnChange,
  onClear: propOnClear,
  onKeyDown,
  defaultValue = '',
  placeholder,
  showClear,
  className
}) {
  const [value, setValue] = useState(defaultValue);

  const onChange = (event) => {
    const { value: eventValue } = event.target;

    setValue(eventValue);
    propOnChange(event);
  };

  const onClear = () => {
    if (value === '') {
      return;
    }

    setValue('');
    propOnClear();
  };

  return <div className={classNames(styles['search-field'], className)}>
    <input
      placeholder={placeholder}
      className={styles['search-field__input']}
      value={value}
      onChange={onChange}
      onKeyDown={onKeyDown}
      data-testid="searchField"
      aria-label="Search field"
    />
    {
      showClear
        ? (
          <Button onClick={onClear} type="submit" className={styles['search-field__button']} data-testid="clearSearch" aria-label="clear search">
            <ClearIcon width={24} height={24} />
          </Button>
        )
        : (null)
    }
  </div>;
}
