import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import SignIn from './pages/SignIn';
import { ROUTES } from '../constants/routes';

const MainPortal: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path={`/`} element={<Home />} />
        <Route path={`/${ROUTES.MAIN_PORTAL.SIGN_IN}`} element={<SignIn />} />
      </Routes>
    </Router>
  );
}

export default MainPortal;
