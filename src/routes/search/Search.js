import React, { useState } from 'react';

import {
  useQuery
} from 'react-query';
import { Link } from 'react-router-dom';

import styles from './Search.module.scss';

import SearchField from '../../components/SearchField/SearchField';
import Image from '../../components/Image/Image';
import Spinner from '../../components/Spinner/Spinner';

import { useQuery as useQueryParams } from '../../hooks/useQuery';
import { debounce } from '../../utils/debounce';

import { debounceTime, queryKeys } from '../../constants/common';
import { routes } from '../../constants/routes';

import { queryKey, get } from '../../queries/search';


export default function Search() {
  let query = useQueryParams();
  const [searchTerm, setSearchTerm] = useState(query.get(queryKeys.searchTerm));
  const { data, isLoading } = useQuery({
    queryKey: [queryKey, searchTerm],
    queryFn: () => get(searchTerm)
  });

  const onSearchChange = ({ target: { value } }) => {
    setSearchTerm(value);
  };

  return (
    <div className={styles.search}>
      <div className={styles.search__field}>
        <SearchField
          showClear
          className={styles.search__input}
          defaultValue={searchTerm}
          onChange={debounce(onSearchChange, debounceTime)}
          onClear={() => onSearchChange({ target: { value: '' } })}
        />
      </div>
      <div className={styles.search__content}>
        <Spinner show={isLoading} />
        <ul className={styles.search__list}>
          {
            data?.media.map(({ preview, 'media-id': id }) => (
              <li key={id} role="listitem">
                <Link to={routes.product(id)} aria-label={preview}>
                  <Image src={preview} alt={preview} loading="eager" />
                </Link>
              </li>
            ))
          }
        </ul>
      </div>
    </div>
  );
}