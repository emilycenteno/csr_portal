import React from 'react';
import ReactDOM from 'react-dom/client'
import {
  createBrowserRouter,
  RouterProvider,
} from 'react-router-dom';
import { allCustomersLoader, customerLoader } from './api.js';
import Home from './routes/Home.jsx';
import App from './App.jsx'
import OverviewPage from './components/customer_overview/OverviewPage.jsx'
import ErrorPage from './routes/ErrorPage.jsx';




import './index.css'
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

import '@fontsource/roboto/300-italic.css';
import '@fontsource/roboto/400-italic.css';
import '@fontsource/roboto/500-italic.css';
import '@fontsource/roboto/700-italic.css';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        index: true,
        element: <Home />,
        loader: allCustomersLoader,
        errorElement: <ErrorPage />,
      },
      {
        path: 'users/:userId',
        element: <OverviewPage />,
        loader: customerLoader,
        errorElement: <ErrorPage />,
      },
    ],
  },
]);
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

