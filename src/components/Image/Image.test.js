import React from 'react';
import { render } from '@testing-library/react';

import Image from './Image';

process.env.CDN = '';

describe('Image component', () => {
  it('should render image', () => {
    const { asFragment } = render(<Image src="logo.svg" width={100} height={100} loading="lazy" srcSet="logo.svg" sizes="sizes" />);

    expect(asFragment()).toMatchSnapshot();
  });

  it('should omit cdn if omitDomain is set to true', () => {
    const { asFragment } = render(<Image src="logo.svg" omitDomain />);

    expect(asFragment()).toMatchSnapshot();
  });
});
