import React from 'react';
import { fireEvent, render, waitFor } from '@testing-library/react';
import {
  QueryClient,
  QueryClientProvider,
} from 'react-query';

import * as useQuery from '../../hooks/useQuery';
import { queryKeys } from '../../constants/common';

import Search from './Search';
import { MemoryRouter } from 'react-router-dom';

process.env.API_URL = '';
process.env.CDN = '';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      cacheTime: 0
    }
  }
});

describe('Search route', () => {
  const searchTerm = 'search term';
  const renderComponent = () => render(
    <QueryClientProvider client={queryClient}>
      <MemoryRouter>
        <Search />
      </MemoryRouter>
    </QueryClientProvider>
  );

  beforeEach(() => {
    global.fetch = jest.fn(Promise.resolve({
      ok: true,
      status: 200,
      json: Promise.resolve({
        media: []
      })
    }));

    jest.spyOn(useQuery, 'useQuery').mockReturnValue(new URLSearchParams({ [queryKeys.searchTerm]: searchTerm }));
  });

  afterEach(jest.clearAllMocks);

  it('should render Search route', async () => {
    global.fetch = jest.fn().mockResolvedValue({
      ok: true,
      status: 200,
      json: () => Promise.resolve({
        media: [
          { preview: '1', 'media-id': 1 },
          { preview: '2', 'media-id': 2 },
          { preview: '3', 'media-id': 3 }
        ]
      })
    });
    const { asFragment, getAllByRole } = renderComponent();

    await waitFor(() => expect(getAllByRole('listitem').length).toEqual(3), { timeout: 2000 });
    expect(asFragment()).toMatchSnapshot();
  });

  it('should send initial API request with the search term from the uri', async () => {
    renderComponent();

    await waitFor(() => expect(global.fetch).toHaveBeenCalled());
    expect(global.fetch).toHaveBeenCalledWith(`search?query="${searchTerm}"`);
  });

  it('should send an API request on search input clear', async () => {
    const { getByTestId } = renderComponent();

    fireEvent.click(getByTestId('clearSearch'));

    await waitFor(() => expect(global.fetch).toHaveBeenCalledTimes(2));
    expect(global.fetch).toHaveBeenNthCalledWith(2, 'search?query=""');
  });

  it('should send an API request on search input change', async () => {
    const { getByTestId } = renderComponent();

    fireEvent.change(getByTestId('searchField'), { target: { value: 'changed' } });

    await waitFor(() => expect(global.fetch).toHaveBeenCalledTimes(2));
    expect(global.fetch).toHaveBeenNthCalledWith(2, 'search?query="changed"');
  });
});
