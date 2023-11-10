import React from 'react';
import { Outlet } from 'react-router-dom';

import Image from '../../components/Image/Image';

import styles from './Root.module.scss';

export default function Root() {
  return (
    <>
      <header className={styles.header}>
        <Image src="logo.svg" loading="eager" fetchPriority width={80} />
        <nav>
          nav
        </nav>
      </header>
      <main>
        <Outlet />
      </main>
    </>
  );
}
