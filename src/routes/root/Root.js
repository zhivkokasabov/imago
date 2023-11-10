import React from 'react';
import { Outlet } from 'react-router-dom';

import Image from '../../components/Image/Image';

import NavLink from './components/NavLink/NavLink';

import styles from './Root.module.scss';

import { routes } from '../../constants/routes';

export default function Root() {
  return (
    <>
      <header className={styles.header}>
        <Image src="logo.svg" loading="eager" fetchPriority width={80} />
        <nav className={styles.nav}>
          <NavLink href={routes.editorial} text="Editorial" />
          <NavLink href={routes.sports} text="Sports" />
          <NavLink href={routes.creative} text="Creatoive" />
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
