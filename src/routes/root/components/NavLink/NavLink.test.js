import React from 'react';
import { render } from '@testing-library/react';
import {
  MemoryRouter,
} from 'react-router-dom';

import NavLink from './NavLink';

describe('NavLink component', () => {
  it('should render NavLink', () => {
    const { asFragment } = render(
      <MemoryRouter>
        <NavLink text="nav link" href="/" />
      </MemoryRouter>
    );

    expect(asFragment()).toMatchSnapshot();
  });
});
