import React from 'react'
import ReactDOM from 'react-dom/client'
import { AuthProvider } from './context/AuthContext';
import { ApplicationProvider } from './context/ApplicationContext';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { ROUTES } from './constants/routes';
import SignIn from './pages/SignIn';
import ShowTimes from './pages/ShowTimes';
import AdminPortal from './pages/AdminPortal';
import ShowTime from './pages/ShowTime';
import Booking from './pages/Booking';
import Tickets from './pages/Tickets';
import About from './pages/About';
import AboutCinema from './pages/AboutCinema';

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
            <Route path={`/${ROUTES.OUR_CINEMA}`} element={<AboutCinema />} />
            <Route path={`/${ROUTES.ADMIN_PORTAL.MOVIES}`} element={<AdminPortal />} />
            <Route path="*" element={<Navigate to={`/${ROUTES.SHOWING}`} replace />} />
          </Routes>
        </Router>
      </ApplicationProvider>
    </AuthProvider>
  </React.StrictMode>,
)
