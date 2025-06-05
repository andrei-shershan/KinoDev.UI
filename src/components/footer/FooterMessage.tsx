import { Link } from 'react-router-dom';
import { useApplicationContext } from '../../state-management/providers/AdminContextProvider';
import './index.css';
import { GithubFilled, LinkedinFilled } from '@ant-design/icons';

export const FooterMessage = () => {
  const { state } = useApplicationContext();
  console.log('FooterMessage state:', state.portalSettings?.githubLink, state.portalSettings?.linkedinLink);

  return (
    <div className="footer-message-container">
      <div className="footer-message-text">
        Welcome to the <strong>KinoDev</strong>
      </div>
      <div className="footer-message-text">
        {<Link target='_blank' to={state.portalSettings?.githubLink || '#'} className="footer-link">Source code at Github: <GithubFilled style={{ fontSize: '20px' }} /> </Link>}
      </div>
      <div className="footer-message-text">
        {<Link target='_blank' to={state.portalSettings?.linkedinLink || '#'} className="footer-link"> Developer's LinkedIn: <LinkedinFilled style={{ fontSize: '20px' }} /></Link>}
      </div>
    </div>
  );
}

