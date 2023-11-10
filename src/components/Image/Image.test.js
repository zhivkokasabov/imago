import React from 'react';
import { render } from '@testing-library/react';

import Image from './Image';

describe('Image component', () => {
  it('should render image', () => {
    const { asFragment } = render(<Image src="logo.svg" width={100} height={100} loading="lazy" srcSet="logo.svg" sizes="sizes" />);

    expect(asFragment()).toMatchSnapshot();
  });
});
