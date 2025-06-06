import React from 'react';
import { PORTALS_TYPES } from '../../constants/portalTypes';
import MainLayout from '../../layouts/mainLayout';
import { PageHeader } from '../../components/headers/pageHeader';

const AboutCinema: React.FC = () => {
  return (
    <MainLayout portalType={PORTALS_TYPES.CLIENT} >

      <PageHeader
        header='About KinoDev Cinema'
      />
      
      <p>
        KinoDev Cinema features multiple screens with the latest digital projection and sound technology.
        We pride ourselves on providing an immersive cinema experience with comfortable seating and
        top-notch facilities.
      </p>
      <p>
        Our facilities include:
      </p>
      <ul>
        <li>8 premium screening rooms</li>
        <li>State-of-the-art sound systems</li>
        <li>Comfortable reclining seats</li>
        <li>Gourmet concession stand</li>
        <li>VIP lounge area</li>
      </ul>
    </MainLayout>
  );
};

export default AboutCinema;
