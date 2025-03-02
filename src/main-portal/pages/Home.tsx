import React from 'react';
import { useHttpClient } from '../../hooks/useHttpClient';

const Home: React.FC = () => {
  const [resp, setResp] = React.useState<string>('');
  const httpClient = useHttpClient();

  const buttonClick = () => {
    httpClient.fetch('https://api-gateway.kinodev.localhost/api/test/mediatr')
      .then((response) => response.text())
      .then((data) => setResp(data))
      .catch((error) => console.error('Error:', error));
  }

  return (
    <div>
      <button onClick={buttonClick}>XXX</button>
      <p>
        {resp
          ? resp
          : 'Click the button to fetch data from the API'}
      </p>
    </div>
  );
};

export default Home;
