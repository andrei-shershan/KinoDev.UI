import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import SignIn from './pages/SignIn';
import { ROUTES } from '../constants/routes';
import { Dummy } from './pages/Dummy';

const MainPortal: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path={`/`} element={<Home />} />
        <Route path={`/${ROUTES.MAIN_PORTAL.SIGN_IN}`} element={<SignIn />} />
        <Route path={`/dummy`} element={<Dummy />} />
      </Routes>
    </Router>
  );
}

export default MainPortal;
