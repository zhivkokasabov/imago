import { createRoot } from 'react-dom/client';
import React from 'react';
import {
  createBrowserRouter,
  RouterProvider,
} from 'react-router-dom';

import './App.css';

import Root from './routes/root/Root';
import Search from './routes/search/Search';

import {
  QueryClient,
  QueryClientProvider,
} from 'react-query';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: Infinity
    },
  },
});

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    // errorElement: <ErrorPage />,
    children: [
      {
        path: 'search',
        element: <Search />,
      }
    ]
  }
]);

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  );
};

const root = createRoot(document.getElementById('app')); 

root.render(<App />);