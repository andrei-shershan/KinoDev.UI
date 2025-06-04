import { ENDPOINTS } from "../constants/endpoints";
import { URLS } from "../constants/urls";
import { InternalApiClient } from "../hooks/useInternalApiClient";
import { PortalSettings } from "../models/portal-settings";
import { APPLICATION_ACTIONS_CONSTS } from "../state-management/action-constants/application";
import { ApplicationContextActions } from "../state-management/actions-types/application-actions";

export const getPortalSettings = async (apiClient: InternalApiClient, dispatch: React.Dispatch<ApplicationContextActions>) => {

  const { fetchGet } = apiClient;

  try {
    dispatch({ type: APPLICATION_ACTIONS_CONSTS.SET_SPINNING, payload: true });
    const response = await fetchGet(`${URLS.API_GATEWAY_BASE_URL}/${ENDPOINTS.API_GATEWAY.PORTAL_SETTINGS}`);
    if (response.ok) {
      const data: PortalSettings = await response.json();
      dispatch({ type: APPLICATION_ACTIONS_CONSTS.SET_PORTAL_SETTINGS, payload: data });
    }
  } catch (error) {
    console.error("Error fetching portal settings:", error);
  }
  finally {
    dispatch({ type: APPLICATION_ACTIONS_CONSTS.SET_PORTAL_SETTINGS, payload: undefined });
    dispatch({ type: APPLICATION_ACTIONS_CONSTS.SET_SPINNING, payload: false });
  }
}
