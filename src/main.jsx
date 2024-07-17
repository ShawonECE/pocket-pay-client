import React from 'react';
import ReactDOM from 'react-dom/client';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import App from './App.jsx';
import './index.css';
import ErrorPage from './components/common/ErrorPage';
import Login from './components/common/Login';
import Register from './components/common/Register.jsx';
import { HelmetProvider } from 'react-helmet-async';
import AuthProvider from './components/common/AuthProvider.jsx';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Private from './components/common/Private.jsx';
import Dashboard from './components/common/Dashboard.jsx';
// import UserRoute from './components/user/UserRoute';
// import AdminRoute from './components/admin/AdminRoute';

const queryClient = new QueryClient();
const router = createBrowserRouter([
  {
    path: "/",
    element: <App></App>,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <Login />,
      },
      {
        path: "register",
        element: <Register />,
      },
    ]
  },
  {
    path: "dashboard",
    element: <Private><Dashboard></Dashboard></Private>,
    errorElement: <ErrorPage />,
    // children: [
    //   {
    //     path: "profile",
    //     element: <Profile />,
    //   },

    //   // user routes
    //   {
    //     path: "my-bookings",
    //     element: <UserRoute><Bookings /></UserRoute>,
    //   },
    //   {
    //     path: "my-wishlist",
    //     element: <UserRoute><Wishlist /></UserRoute>,
    //   },
    //   {
    //     path: "be-guide",
    //     element: <UserRoute><BeGuide /></UserRoute>,
    //   },

    //   // admin routes
    //   {
    //     path: "manage-users",
    //     element: <AdminRoute><ManageUsers /></AdminRoute>,
    //   },
    //   {
    //     path: "guide-requests",
    //     element: <AdminRoute><GuideRequests /></AdminRoute>,
    //   },

    //   agent routes
    //   {
    //     path: "assigned-tours",
    //     element: <GuideRoute><AssignedTours /></GuideRoute>,
    //   },

    // ]
  }
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <HelmetProvider>
          <RouterProvider router={router} />
        </HelmetProvider>
      </AuthProvider>
    </QueryClientProvider>
  </React.StrictMode>
)
