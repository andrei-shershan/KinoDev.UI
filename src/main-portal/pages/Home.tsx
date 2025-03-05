import React, { useEffect } from 'react';
import { useAuthContext } from '../../context/AuthContext';
import { useInternalApiClient } from '../../hooks/useInternalApiClient';
import { URLS } from '../../constants/urls';
import { ENDPOINTS } from '../../constants/endpoints';
import { useNavigate } from 'react-router-dom';

const Home: React.FC = () => {
  const { state } = useAuthContext();
  const { fetchWithAccessToken, fetchSignIn, refreshToken } = useInternalApiClient();
  const naigate = useNavigate();
  useEffect(() => {
    console.log(state);
  }, [state]);

  // const buttonClick = () => {
  //   httpClient.fetch('https://api-gateway.kinodev.localhost/api/test/mediatr', {credentials: 'include'})
  //     .then((response) => response.text())
  //     .then((data) => setResp(data))
  //     .catch((error) => console.error('Error:', error));
  // }

  const handletDetailsClick = async () => {
    // const response = await fetchWithAuthToken(useAuthContext(), 'https://api-gateway.kinodev.localhost/api/test/mediatr');
    const response = await fetchWithAccessToken(`${URLS.API_GATEWAY_BASE_URL}/${ENDPOINTS.API_GATEWAY.USERS.DETAILS}`);

    console.log(response);
  }

  const handleSignInClick = async () => {
    const response = await fetchSignIn('manager@kinodev.com', 'Test123!');

    console.log(response);
  }


  const handleRefresh = async () => {
    const response = await refreshToken();

    console.log(response);
  }

  const handleDummy = () => {
    naigate('/dummy');
  }

  return (
    <div>
      <button onClick={handletDetailsClick}>Call details</button>
      <br />

      <button onClick={handleSignInClick}>Sign In</button>
      <br />

      <button onClick={handleRefresh}>Refresh</button>
      <br />

      <button onClick={handleDummy}>GO TO DUMMY!</button>
      {/* <button onClick={buttonClick}>XXX</button> */}
    </div>
  );
};

export default Home;
