import React from 'react';
import { PORTALS_TYPES } from '../../constants/portalTypes';
import MainLayout from '../../layouts/mainLayout';
import { PageHeader } from '../../components/headers/pageHeader';

import './about.css'; 
import { useApplicationContext } from '../../state-management/providers/AdminContextProvider';
import { Link } from 'react-router-dom';
import { GithubFilled } from '@ant-design/icons';

const About: React.FC = () => {
  const { state } = useApplicationContext();
  return (
    <MainLayout portalType={PORTALS_TYPES.CLIENT} >

      <PageHeader
        header='About KinoDev'
      />
      <p>
        KinoDev is a minimalistic MVP for streamlined cinema management and ticket sales.
        Built with a modern tech stack, it lets theater owners schedule screenings, configure halls and seat layouts,
        track real-time availability, and process online payments securely.
      </p>
      <p>
        Our solution is built on a robust, scalable tech stack:
        <ul className='about-list'>
          <li><strong>React + TypeScript</strong> power a fast, type-safe, and responsive frontend</li>
          <li><strong>MySQL</strong> stores all movie, screening, and ticket data in a reliable relational database</li>
          <li><strong>Azure Functions</strong> enable lightweight serverless logic and event-driven workflows</li>
          <li><strong>Azure Service Bus</strong> ensures reliable, asynchronous messaging between components</li>
          <li><strong>CI/CD pipelines</strong> automate build, test, and deployment processes</li>
          <li><strong>Unit tests</strong> safeguard code quality and stability at every development stage</li>
          <li><strong>Docker</strong> containerizes services for consistent local development and testing</li>
        </ul>
      </p>
      <p>
        Project details and source code are available on {<Link target='_blank' to={state.portalSettings?.githubLink || '#'} className="footer-link"><GithubFilled style={{ fontSize: '20px' }} /> Github </Link>}

      </p>
    </MainLayout>
  );
};

export default About;
