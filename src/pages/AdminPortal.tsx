import { ENDPOINTS } from "../constants/endpoints";
import { PORTALS_TYPES } from "../constants/portalTypes";
import { URLS } from "../constants/urls";
import { useInternalApiClient } from "../hooks/useInternalApiClient";
import MainLayout from "../layouts/mainLayout";

const AdminPortal: React.FC = () => {
  const { fetchGet } = useInternalApiClient();
  const handleClick = async () => {
    await fetchGet(`${URLS.API_GATEWAY_BASE_URL}/${ENDPOINTS.API_GATEWAY.MOVIES.GET_MOVIES}`)
  };

  return (
    <MainLayout portalType={PORTALS_TYPES.ADMIN} >
      Welcome to the Admin Portal

    </MainLayout>
  );

  return (<div>
    <button onClick={handleClick}>ADMIN MEDIATR</button>
  </div>);
}

export default AdminPortal;