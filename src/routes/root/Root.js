import React from 'react';
import { Outlet } from 'react-router-dom';

import styles from './Root.module.scss';

export default function Root() {
  return (
    <>
      <header className={styles.header}>
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
