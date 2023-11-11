import React from 'react';
import { render } from '@testing-library/react';

import Spinner from './Spinner';

describe('Spinner component', () => {
  it('should render Spinner if show is set to true', () => {
    const { asFragment } = render(<Spinner show />);

    expect(asFragment()).toMatchSnapshot();
  });

  it('should not render Spinner if show is set to false', () => {
    const { asFragment } = render(<Spinner />);

    expect(asFragment()).toMatchSnapshot();
  });
});
