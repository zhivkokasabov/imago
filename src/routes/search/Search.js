import React from 'react';

import styles from './Search.module.scss';

import SearchField from '../../components/SearchField/SearchField';

import { useQuery } from '../../hooks/useQuery';
import { debounce } from '../../utils/debounce';
import { debounceTime } from '../../constants/common';

export default function Search() {
  let query = useQuery();

  const onSearchChange = ({ target: { value } }) => {
    console.log(value);
  };

  return (
    <div className={styles.search}>
      <SearchField
        showClear
        className={styles.search__input}
        defaultValue={query.get('searchTerm')}
        onChange={debounce(onSearchChange, debounceTime)}
        onClear={() => onSearchChange({ target: { value: '' } })}
      />
    </div>
  );
}