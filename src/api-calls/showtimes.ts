import { ENDPOINTS } from "../constants/endpoints";
import { URLS } from "../constants/urls";
import { InternalApiClient } from "../hooks/useInternalApiClient";
import { ShowTimeDetailsApiModel } from "../models/api.models";
import { APPLICATION_ACTIONS_CONSTS } from "../state-management/action-constants/application";
import { ApplicationContextActions } from "../state-management/actions-types/application-actions";

export const getShowTimes = async (apiClient: InternalApiClient, dispatch: React.Dispatch<ApplicationContextActions>, startDate: string, endDate: string) => {
  const { fetchGet } = apiClient;

  try {
    dispatch({ type: APPLICATION_ACTIONS_CONSTS.SET_SPINNING, payload: true });

    const getShowTimesResponse
      = await fetchGet(`${URLS.API_GATEWAY_BASE_URL}/${ENDPOINTS.API_GATEWAY.SHOW_TIMES.GET_SHOW_TIMES}/${startDate}/${endDate}`);
    if (getShowTimesResponse.ok) {
      const showTimes: ShowTimeDetailsApiModel[] = await getShowTimesResponse.json();
      dispatch({ type: APPLICATION_ACTIONS_CONSTS.GET_SHOW_TIMES, payload: showTimes });
    } else {
      dispatch({ type: APPLICATION_ACTIONS_CONSTS.GET_SHOW_TIMES, payload: [] });
    }
  }
  catch (error) {
    console.error("Error fetching show times:", error);
    dispatch({ type: APPLICATION_ACTIONS_CONSTS.GET_SHOW_TIMES, payload: [] });
  }
  finally {
    dispatch({ type: APPLICATION_ACTIONS_CONSTS.SET_SPINNING, payload: false });
  }
}