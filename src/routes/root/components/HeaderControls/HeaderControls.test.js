import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

import HeaderControls from './HeaderControls';

import { routes } from '../../../../constants/routes';

import * as reactRouterDom from 'react-router-dom';

jest.mock('react-router-dom', () => {
  const actual = jest.requireActual('react-router-dom');

  return {
    ...actual,
    useNavigate: jest.fn(),
    useLocation: jest.fn()
  };
});

describe('HeaderControls component', () => {
  const navigateMock = jest.fn();
  const searchTerm = 'searchTerm';

  const renderComponent = (args) => render(
    <MemoryRouter {...args}>
      <HeaderControls type="button" />
    </MemoryRouter>
  );

  beforeEach(() => {
    jest.spyOn(reactRouterDom, 'useNavigate').mockReturnValue(navigateMock);
    jest.spyOn(reactRouterDom, 'useLocation').mockReturnValue({});
  });

  afterEach(jest.clearAllMocks);

  it(`should render search if pathname does not equals ${routes.search()}`, () => {
    const { asFragment } = renderComponent();

    expect(asFragment()).toMatchSnapshot();
  });

  it(`should not render search if pathname equals ${routes.search()}`, () => {
    jest.spyOn(reactRouterDom, 'useLocation').mockReturnValue({
      pathname: routes.search()
    });

    const { asFragment } = renderComponent();

    expect(asFragment()).toMatchSnapshot();
  });

  it('should navigate on enter key down', () => {
    const { getByTestId } = renderComponent();

    fireEvent.change(getByTestId('searchField'), { target: { value: searchTerm } });
    fireEvent.keyDown(getByTestId('searchField'), { key: 'Enter' });

    expect(navigateMock).toHaveBeenCalledTimes(1);
    expect(navigateMock).toHaveBeenCalledWith(routes.search(searchTerm));
  });

  it('should navigate on searchButton click', () => {
    const { getByTestId } = renderComponent();

    fireEvent.change(getByTestId('searchField'), { target: { value: searchTerm } });
    fireEvent.click(getByTestId('searchButton'));

    expect(navigateMock).toHaveBeenCalledTimes(1);
    expect(navigateMock).toHaveBeenCalledWith(routes.search(searchTerm));
  });
});
