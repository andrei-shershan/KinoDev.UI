import { ENDPOINTS } from "../constants/endpoints";
import { ROLES } from "../constants/roles";
import { URLS } from "../constants/urls";
import { InternalApiClient } from "../hooks/useInternalApiClient";

export const getUserDetails = async (apiClient: InternalApiClient) => {

  const { fetchGet } = apiClient;

  const userDetailsResponse = await fetchGet(`${URLS.API_GATEWAY_BASE_URL}/${ENDPOINTS.API_GATEWAY.USERS.DETAILS}`);
  if (userDetailsResponse.ok) {
    const userDetails = await userDetailsResponse.json();

    if (userDetails.find((x: string) => x === ROLES.ADMIN)) {
      window.location.href = URLS.ADMIN_PORTAL_URL;
    }
    else {
      window.location.href = URLS.MAIN_PORTAL_URL;
    }
  }
}
