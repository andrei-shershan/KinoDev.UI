import { Link } from 'react-router-dom';
import { useApplicationContext } from '../../state-management/providers/AdminContextProvider';
import './index.css';

export const FooterMessage = () => {
  const { state } = useApplicationContext();

  return (
    <div className="footer-message-container">
      <span className="footer-message-text">
        Welcome to the <strong>KinoDev</strong>
      </span>
      <br />
      <br />
      <span className="footer-message-text">
        find source code at Github: {<Link to={state.portalSettings?.githubLink || '#'} className="footer-link">KinoDev</Link>}
      </span>
      <br />
      <span className="footer-message-text">
        find developer at LinkedIn: {<Link to={state.portalSettings?.linkedinLink || '#'} className="footer-link">KinoDev</Link>}
      </span>
    </div>
  );
}

