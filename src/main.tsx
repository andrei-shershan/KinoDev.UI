import React from 'react'
import ReactDOM from 'react-dom/client'
import MainPortal from './main-portal/MainPortal'
import AdminPortal from './admin-portal/AdminPortal';
import { PORTALS } from './constants/portals';

const isAdminPortal = window.location.hostname.toLowerCase().startsWith(`${PORTALS.ADMIN}`.toLowerCase());

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    {
      isAdminPortal
       ? <AdminPortal />
       : <MainPortal />
    }
  </React.StrictMode>,
)
