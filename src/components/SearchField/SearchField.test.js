import React from 'react';
import { fireEvent, render } from '@testing-library/react';

import SearchField from './SearchField';

describe('SearchField component', () => {
  it('should render SearchField', () => {
    const { asFragment } = render(<SearchField type="button" />);

    expect(asFragment()).toMatchSnapshot();
  });

  it('should render clear button if showClear is true', () => {
    const { asFragment } = render(<SearchField showClear />);

    expect(asFragment()).toMatchSnapshot();
  });

  it('should call onClear when button gets clicked', () => {
    const onClearMock = jest.fn();
    const { getByRole } = render(<SearchField showClear onClear={onClearMock} />);

    fireEvent.click(getByRole('button'));

    expect(onClearMock).toHaveBeenCalledTimes(1);
  });

  it('should call onKeyDown callback', () => {
    const onKeyDownMock = jest.fn();
    const { getByTestId } = render(<SearchField showClear onKeyDown={onKeyDownMock} />);

    fireEvent.keyDown(getByTestId('searchField'));

    expect(onKeyDownMock).toHaveBeenCalledTimes(1);
  });

  it('should call onChange callback', () => {
    const onChangeMock = jest.fn();
    const { getByTestId } = render(<SearchField showClear onChange={onChangeMock} />);

    fireEvent.change(getByTestId('searchField'), { target: { value: 'change' } });

    expect(onChangeMock).toHaveBeenCalledTimes(1);
  });
});
