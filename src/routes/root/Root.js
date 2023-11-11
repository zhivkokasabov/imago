import React from 'react';
import { Outlet } from 'react-router-dom';

import NavLink from './components/NavLink/NavLink';
import HeaderControls from './components/HeaderControls/HeaderControls';

import styles from './Root.module.scss';

import { routes } from '../../constants/routes';

export default function Root() {
  return (
    <>
      <header className={styles.header}>
        <HeaderControls className={styles.header__controls} />
        <nav className={styles.nav}>
          <NavLink href={routes.editorial} text="Editorial" />
          <NavLink href={routes.sports} text="Sports" />
          <NavLink href={routes.creative} text="Creative" />
          <NavLink href={routes.archive} text="Archive" />
          <NavLink className={styles['nav--accent']} href={routes.account} text="Account" />
        </nav>
      </header>
      <main>
        <Outlet />
      </main>
    </>
  );
}
