import React from 'react'
import ReactDOM from 'react-dom/client'
import MainPortal from './main-portal/MainPortal'
import AdminPortal from './admin-portal/AdminPortal';
import { PORTALS } from './constants/portals';
import { AuthProvider } from './context/AuthContext';

const isAdminPortal = window.location.hostname.toLowerCase().startsWith(`${PORTALS.ADMIN}`.toLowerCase());

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <AuthProvider>
      {
        isAdminPortal
          ? <AdminPortal />
          : <MainPortal />
      }
    </AuthProvider>
  </React.StrictMode>,
)
