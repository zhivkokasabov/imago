import React from 'react';
import { fireEvent, render, waitFor } from '@testing-library/react';
import {
  QueryClient,
  QueryClientProvider,
} from 'react-query';

import Product from './Product';
import * as Router from 'react-router-dom';

process.env.API_URL = '';
process.env.CDN = '';

jest.mock('react-router-dom', () => {
  const actual = jest.requireActual('react-router-dom');

  return {
    ...actual,
    useParams: jest.fn()
  };
});

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      cacheTime: 0
    }
  }
});

describe('Product route', () => {
  const id = '1';
  const licenses = {
    caption: 'IMAGO Creative: Stadtlandschaften - Straßen von Berlin Low angle view of World Clock in Alexanderplatz square, Berlin City Copyright: PabloxCamacho B18116043',
    cliplength: 0,
    creationdate: '2021-03-15 00:00:00.000',
    creator: 'PhotoAlto',
    height: 5180,
    mediathumb: 'https://www.imago-images.com/bild/st/0115446019/s.jpg',
    title: 'IMAGO Creative: Stadtlandschaften - Straßen von Berlin Low angle view of World Clock in Alexanderpl',
    usagelicences: [
        {
          credits: 110,
          languagePointer: 'licence3',
          name: 'Web',
          licenseid: 3
        },
        {
          credits: 20,
          name: 'Full RF',
          licenseid: 4
        }
    ],
    width: 7695
  };
  const renderComponent = () => render(
    <QueryClientProvider client={queryClient}>
      <Router.MemoryRouter>
        <Product />
      </Router.MemoryRouter>
    </QueryClientProvider>
  );

  beforeEach(() => {
    global.fetch = jest.fn(() => Promise.resolve({
      ok: true,
      status: 200,
      json: () => Promise.resolve(licenses)
    }));

    jest.spyOn(Router, 'useParams').mockReturnValue({ id });
  });

  afterEach(jest.clearAllMocks);

  it('should render Product route', async () => {
    const { asFragment, queryByText } = renderComponent();

    await waitFor(() => expect(queryByText('Choose your License')).toBeInTheDocument());
    expect(asFragment()).toMatchSnapshot();
  });

  it('should send initial API request with the product id from the uri', async () => {
    renderComponent();

    await waitFor(() => expect(global.fetch).toHaveBeenCalled());
    expect(global.fetch).toHaveBeenCalledWith(`media/${id}`);
  });

  it('should show loading while the request is ongoing', async () => {
    const { asFragment } = renderComponent();

    expect(asFragment()).toMatchSnapshot();
    await waitFor(() => expect(global.fetch).toHaveBeenCalled());
  });

  it('should use the cheapest license for the info header', async () => {
    const { getByTestId, queryByText } = renderComponent();

    await waitFor(() => expect(queryByText('Choose your License')).toBeInTheDocument());
    expect(getByTestId('cheapestLicense')).toHaveTextContent('20 Credits');
  });

  it('should mark selected licens', async () => {
    const { asFragment, queryByText, getAllByTestId } = renderComponent();

    await waitFor(() => expect(queryByText('Choose your License')).toBeInTheDocument());
    
    fireEvent.click(getAllByTestId('licenseLabel')[1]);

    expect(asFragment()).toMatchSnapshot();
  });
});
