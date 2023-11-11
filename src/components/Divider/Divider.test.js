import React from 'react';
import { render } from '@testing-library/react';

import Divider from './Divider';

describe('Divider component', () => {
  it('should render Divider', () => {
    const { asFragment } = render(<Divider />);

    expect(asFragment()).toMatchSnapshot();
  });

  it('should render light Divider', () => {
    const { asFragment } = render(<Divider variant="light" />);

    expect(asFragment()).toMatchSnapshot();
  });
});
