import { createRoot } from 'react-dom/client';
import React from 'react';
import {
  createBrowserRouter,
  RouterProvider,
} from 'react-router-dom';

import './App.css';

import Root from './routes/root/Root';

const App = () => {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <Root />,
      // errorElement: <ErrorPage />,
      // children: [
      //   {
      //     path: "contacts/:contactId",
      //     element: <Contact />,
      //   },
      // ],
    },
  ]);

  return <RouterProvider router={router} />;
}

const root = createRoot(document.getElementById('app')); 

root.render(<App />);