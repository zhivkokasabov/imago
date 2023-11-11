import React, { useState } from 'react';

import {
  useQuery
} from 'react-query';

import styles from './Search.module.scss';

import SearchField from '../../components/SearchField/SearchField';
import Image from '../../components/Image/Image';
import Spinner from '../../components/Spinner/Spinner';

import { useQuery as useQueryParams } from '../../hooks/useQuery';
import { debounce } from '../../utils/debounce';
import { debounceTime, queryKeys } from '../../constants/common';
import { queryKey, search } from '../../queries/search';
import { Link } from 'react-router-dom';

import { routes } from '../../constants/routes';

export default function Search() {
  let query = useQueryParams();
  const [searchTerm, setSearchTerm] = useState(query.get(queryKeys.searchTerm));
  const { data, isLoading } = useQuery({
    queryKey: [queryKey],
    queryFn: () => search(searchTerm)
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
        {
          isLoading
            ? (
              <Spinner />
            ) : (
              null
            )
        }
        {
          data ?
            (
              <ul className={styles.search__list}>
                {
                  data.media.map(({ preview, 'media-id': id }) => (
                    <li key={id}>
                      <Link to={routes.image(id)} aria-label={preview}>
                        <Image src={preview} alt={preview} loading="eager" />
                      </Link>
                    </li>
                  ))
                }
              </ul>
            ) : (null)
        }
      </div>
    </div>
  );
}