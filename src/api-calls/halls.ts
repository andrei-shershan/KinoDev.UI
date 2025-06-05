import { ENDPOINTS } from "../constants/endpoints";
import { URLS } from "../constants/urls";
import { InternalApiClient } from "../hooks/useInternalApiClient";
import { HallSummary } from "../models/api.models";
import { APPLICATION_ACTIONS_CONSTS } from "../state-management/action-constants/application";
import { ApplicationContextActions } from "../state-management/actions-types/application-actions";

export const getHalls = async (apiClient: InternalApiClient, dispatch: React.Dispatch<ApplicationContextActions>) => {
  const { fetchGet } = apiClient;

  try {
    dispatch({ type: APPLICATION_ACTIONS_CONSTS.SET_SPINNING, payload: true });

    var hallsResponse = await fetchGet(`${URLS.API_GATEWAY_BASE_URL}/${ENDPOINTS.API_GATEWAY.HALLS.GET_HALLS}`);
    if (hallsResponse.ok) {
      const halls: HallSummary[] = await hallsResponse.json();
      dispatch({ type: APPLICATION_ACTIONS_CONSTS.SET_HALLS, payload: halls });
    }
    else {
      dispatch({ type: APPLICATION_ACTIONS_CONSTS.SET_HALLS, payload: [] });
    }
  }
  catch (error) {
    console.error("Error fetching halls:", error);
    dispatch({ type: APPLICATION_ACTIONS_CONSTS.SET_HALLS, payload: [] });
  }
  finally {
    dispatch({ type: APPLICATION_ACTIONS_CONSTS.SET_SPINNING, payload: false });
  }
};