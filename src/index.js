import { createRoot } from 'react-dom/client';
import React from 'react';
import {
  createBrowserRouter,
  RouterProvider,
} from 'react-router-dom';

import './App.css';

import Root from './routes/root/Root';
import Search from './routes/search/Search';

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
  return <RouterProvider router={router} />;
};

const root = createRoot(document.getElementById('app')); 

root.render(<App />);