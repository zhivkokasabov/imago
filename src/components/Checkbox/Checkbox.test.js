import React from 'react';
import { render } from '@testing-library/react';

import Checkbox from './Checkbox';

describe('Checkbox component', () => {
  it('should render Checkbox', () => {
    const { asFragment } = render(<Checkbox />);

    expect(asFragment()).toMatchSnapshot();
  });

  it('should render active Checkbox', () => {
    const { asFragment } = render(<Checkbox active />);

    expect(asFragment()).toMatchSnapshot();
  });
});
