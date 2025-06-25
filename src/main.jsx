import React from 'react';
import ReactDOM from 'react-dom/client'
import {
  createBrowserRouter,
  RouterProvider,
} from 'react-router-dom';
import Home from './routes/home.jsx'
import App from './App.jsx'
import OverviewPage from './components/Customer Overview Page/OverviewPage.jsx'
import usersData from './tests/MOCK_DATA.json';

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
    loader: () => usersData,
    children: [
      {
        index: true,
        element: <Home />,
        errorElement: <div>Something went wrong loading data</div>,

      },
    ]
  },
  {
    path: 'users/:userId',
    element: <OverviewPage />,
    loader: async ({ params }) => {
      const userId = parseInt(params.userId, 10); // convert to number
      const user = usersData.find(u => u.id === userId);
      if (!user) {
        throw new Response("Not Found", { status: 404 });
      }
      return user;
    },
    errorElement: <div>User not found</div>
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
)

