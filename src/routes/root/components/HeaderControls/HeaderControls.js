import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';

import Image from '../../../../components/Image/Image';
import SearchField from '../../../../components/SearchField/SearchField';
import Button from '../../../../components/Button/Button';
import SearchIcon from '../../../../icons/SearchIcon';

import styles from './HeaderControls.module.scss';

import { routes } from '../../../../constants/routes';
import { logoUrl } from '../../../../constants/common';

import classNames from 'classnames';

export default function HeaderControls({ className }) {
  const [searchTerm, setSearchTerm] = useState();
  const [showSearchBar, setShowSearchBar] = useState(true);
  let navigate = useNavigate();
  let { pathname } = useLocation();

  const onSearchChange = ({ target: { value } }) => setSearchTerm(value);
  const onKeyDown = ({ key }) => key === 'Enter' && navigate(routes.search(searchTerm));
  const onSearchIconClick = () => navigate(routes.search(searchTerm));

  useEffect(() => {
    if (pathname === routes.search()) {
      setShowSearchBar(false);
    } else {
      setShowSearchBar(true);
    }
  }, [pathname]);

  return (
    <div className={classNames(styles['header-controls'], className)}>
      <Link to={routes.home}>
        <Image src={logoUrl} alt="logo" loading="eager" width={80} />
      </Link>
      {
        showSearchBar
          ? (
            <div className={styles['header-controls__search-container']}>
              <Button onClick={onSearchIconClick} type="button" data-testid="searchButton">
                <SearchIcon width={16} height={16} />
              </Button>
              <SearchField
                className={styles['header-controls__input']}
                placeholder="Search..."
                onChange={onSearchChange}
                onKeyDown={onKeyDown}
              />
            </div>
          )
          : (null)
      }
    </div>
  );
}