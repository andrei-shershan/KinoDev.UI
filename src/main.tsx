import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { ROUTES } from './constants/routes';
import AdminMovies from './pages/AdminPortal/AdminMovies';
import AdminMovie from './pages/AdminPortal/AdminMovie';
import AdminAddMovie from './pages/AdminPortal/AdminAddMovie';
import AdminHalls from './pages/AdminPortal/AdminHalls';
import AdminAddHall from './pages/AdminPortal/AdminAddHall';
import AdminShowTimes from './pages/AdminPortal/AdminShowTimes';
import AdminAddShowTime from './pages/AdminPortal/AdminAddShowTime';
import { ApplicationProvider } from './state-management/providers/AdminContextProvider';
import { AuthProvider } from './state-management/providers/AuthContextProvider';
import About from './pages/ClientPortal/About';
import Booking from './pages/ClientPortal/Booking';
import ShowTimes from './pages/ClientPortal/ShowTimes';
import Tickets from './pages/ClientPortal/Tickets';
import SignIn from './pages/Shared/SignIn';
import ShowTime from './pages/ClientPortal/ShowTime';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <AuthProvider>
      <ApplicationProvider>
        <Router>
          <Routes>
            <Route path={`/${ROUTES.BOOKING}`} element={<Booking />} />
            <Route path={`/${ROUTES.SIGN_IN}`} element={<SignIn />} />
            <Route path={`/${ROUTES.SHOWING}/:date?`} element={<ShowTimes />} />
            <Route path={`/${ROUTES.SHOWTIMES}/:showTimeId`} element={<ShowTime />} />
            <Route path={`/${ROUTES.SHOWTIMES}/:showTimeId/booking`} element={<ShowTime />} />
            <Route path={`/${ROUTES.TICKETS}`} element={<Tickets />} />
            <Route path={`/${ROUTES.ABOUT}`} element={<About />} />
            <Route path={`/${ROUTES.ADMIN_PORTAL.MOVIES}/add`} element={<AdminAddMovie />} />
            <Route path={`/${ROUTES.ADMIN_PORTAL.MOVIES}/:movieId`} element={<AdminMovie />} />
            <Route path={`/${ROUTES.ADMIN_PORTAL.MOVIES}`} element={<AdminMovies />} />
            <Route path={`/${ROUTES.ADMIN_PORTAL.HALLS}`} element={<AdminHalls />} />
            <Route path={`/${ROUTES.ADMIN_PORTAL.HALLS}/add`} element={<AdminAddHall />} />
            <Route path={`/${ROUTES.ADMIN_PORTAL.SHOWTIMES}`} element={<AdminShowTimes />} />
            <Route path={`/${ROUTES.ADMIN_PORTAL.SHOWTIMES}/add`} element={<AdminAddShowTime />} />
            <Route path={`/${ROUTES.ADMIN_PORTAL.HOME}`} element={<Navigate to={`/${ROUTES.ADMIN_PORTAL.MOVIES}`} replace />} />
            <Route path="*" element={<Navigate to={`/${ROUTES.SHOWING}`} replace />} />
          </Routes>
        </Router>
      </ApplicationProvider>
    </AuthProvider>
  </React.StrictMode>,
)
