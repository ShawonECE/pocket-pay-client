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
import UserRoute from './components/user/UserRoute.jsx';
import SendMoney from './components/user/SendMoney';
import Overview from './components/common/Overview';
import CashOut from './components/user/CashOut';
import CashIn from './components/user/CashIn';
import TxnHistory from './components/common/TxnHistory';
import AdminRoute from './components/admin/AdminRoute';
import ManageUsers from './components/admin/ManageUsers';
import AllTxn from './components/admin/AllTxn';
import AgentRoute from './components/agent/AgentRoute';
import CashInRequests from './components/agent/CashInRequests';
import CashOutRequests from './components/agent/CashOutRequests';

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
    children: [
      {
        path: "overview",
        element: <Overview />,
      },

      // user routes
      {
        path: "send-money",
        element: <UserRoute><SendMoney /></UserRoute>,
      },
      {
        path: "cash-out",
        element: <UserRoute><CashOut /></UserRoute>,
      },
      {
        path: "cash-in",
        element: <UserRoute><CashIn /></UserRoute>,
      },
      {
        path: "txn-history",
        element: <UserRoute><TxnHistory /></UserRoute>,
      },

      // admin routes
      {
        path: "manage-users",
        element: <AdminRoute><ManageUsers /></AdminRoute>,
      },
      {
        path: "all-txn",
        element: <AdminRoute><AllTxn /></AdminRoute>,
      },

    //   agent routes
      {
        path: "cash-in-requests",
        element: <AgentRoute><CashInRequests /></AgentRoute>,
      },
      {
        path: "cash-out-requests",
        element: <AgentRoute><CashOutRequests /></AgentRoute>,
      },
      {
        path: "txn-history",
        element: <AgentRoute><TxnHistory /></AgentRoute>,
      }

    ]
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
