import React from 'react';

const Home: React.FC = () => {
  const [resp, setResp] = React.useState<string>('');

  const buttonClick = () => {
    fetch('https://api-gateway.kinodev.localhost/api/test/hello')
      .then((response) => response.text())
      .then((data) => setResp(data));
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
