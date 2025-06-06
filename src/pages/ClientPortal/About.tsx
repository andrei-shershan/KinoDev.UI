import React from 'react';
import { PORTALS_TYPES } from '../../constants/portalTypes';
import MainLayout from '../../layouts/mainLayout';
import { PageHeader } from '../../components/headers/pageHeader';

const About: React.FC = () => {
  return (
    <MainLayout portalType={PORTALS_TYPES.CLIENT} >
      
      <PageHeader
        header='About KinoDev'
      />

      <p>
        Welcome to KinoDev, your premier destination for the latest movies and entertainment.
        This page contains information about our services, history, and mission.
      </p>
      <p>
        Our mission is to provide an exceptional movie-going experience with state-of-the-art
        technology and comfortable seating.
      </p>
    </MainLayout>
  );
};

export default About;
