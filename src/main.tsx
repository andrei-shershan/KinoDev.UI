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
import AdminMovies from './pages/AdminPortal/AdminMovies';
import { AdminProvider } from './context/AdminContext';
import AdminMovie from './pages/AdminPortal/AdminMovie';
import AdminAddMovie from './pages/AdminPortal/AdminAddMovie';
import AdminHalls from './pages/AdminPortal/AdminHalls';
import AdminAddHall from './pages/AdminPortal/AdminAddHall';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <AuthProvider>
      <ApplicationProvider>
        <AdminProvider>
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
              <Route path={`/${ROUTES.ADMIN_PORTAL.MOVIES}/add`} element={<AdminAddMovie />} />
              <Route path={`/${ROUTES.ADMIN_PORTAL.MOVIES}/:movieId`} element={<AdminMovie />} />
              <Route path={`/${ROUTES.ADMIN_PORTAL.MOVIES}`} element={<AdminMovies />} />
              <Route path={`/${ROUTES.ADMIN_PORTAL.HALLS}`} element={<AdminHalls />} />
              <Route path={`/${ROUTES.ADMIN_PORTAL.HOME}`} element={<AdminPortal />} />
              <Route path={`/${ROUTES.ADMIN_PORTAL.HALLS}/add`} element={<AdminAddHall />} />
              <Route path="*" element={<Navigate to={`/${ROUTES.SHOWING}`} replace />} />
            </Routes>
          </Router>
        </AdminProvider>
      </ApplicationProvider>
    </AuthProvider>
  </React.StrictMode>,
)
