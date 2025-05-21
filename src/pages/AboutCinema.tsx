import React from 'react';
import MainLayout from '../layouts/mainLayout';
import { PORTALS_TYPES } from '../constants/portalTypes';

const AboutCinema: React.FC = () => {
  return (
    <MainLayout portalType={PORTALS_TYPES.CLIENT} >
      <div style={{ padding: '24px' }}>
        <h1>Our Cinema</h1>
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
      </div>
    </MainLayout>
  );
};

export default AboutCinema;
