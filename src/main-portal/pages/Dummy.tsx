import { ENDPOINTS } from "../../constants/endpoints";
import { URLS } from "../../constants/urls";
import { useInternalApiClient } from "../../hooks/useInternalApiClient";

export const Dummy = () => {
    const { fetchWithAccessToken } = useInternalApiClient();
  
  const handleClick = async () => {
    // const response = await fetchWithAuthToken(useAuthContext(), 'https://api-gateway.kinodev.localhost/api/test/mediatr');
    const response = await fetchWithAccessToken (`${URLS .API_GATEWAY_BASE_URL}/${ENDPOINTS.API_GATEWAY.USERS.DETAILS}`);

    console.log(response);
  }

  return (

    <button onClick={handleClick} >DO!</button>
  );
}