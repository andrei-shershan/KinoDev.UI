import { ENDPOINTS } from "../../constants/endpoints";
import { URLS } from "../../constants/urls";
import { useInternalApiClient } from "../../hooks/useInternalApiClient";

const Home: React.FC = () => {
  const { fetchWithAccessToken } = useInternalApiClient();
  const handleClick = async () => {
    await fetchWithAccessToken(`${URLS.API_GATEWAY_BASE_URL}/${ENDPOINTS.API_GATEWAY.TEST.MEDIATR}`)
  };

  return (<div>
    <button onClick={handleClick}>ADMIN MEDIATR</button>
  </div>);
}

export default Home;