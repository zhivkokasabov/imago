import React from 'react';
import { fireEvent, render } from '@testing-library/react';

import Button from './Button';

describe('Button component', () => {
  it('should render Button', () => {
    const { asFragment } = render(<Button type="button" />);

    expect(asFragment()).toMatchSnapshot();
  });

  it('should propagate click event', () => {
    const onClickMock = jest.fn();

    const { getByRole } = render(<Button onClick={onClickMock} type="button" role="button" />);

    fireEvent.click(getByRole('button'));

    expect(onClickMock).toHaveBeenCalledTimes(1);
  });
});
