import { message } from "antd";
import { ENDPOINTS } from "../constants/endpoints";
import { URLS } from "../constants/urls";
import { InternalApiClient } from "../hooks/useInternalApiClient";
import { MovieShowTimes } from "../models/api.models";
import { APPLICATION_ACTIONS_CONSTS } from "../state-management/action-constants/application";
import { ApplicationContextActions } from "../state-management/actions-types/application-actions";
import { ERRORS } from "../constants/errors";

export const getMovies = async (apiClient: InternalApiClient, dispatch: React.Dispatch<ApplicationContextActions>) => {
  const { fetchGet } = apiClient;
  try {
    dispatch({ type: APPLICATION_ACTIONS_CONSTS.SET_SPINNING, payload: true });

    const moviesResponse = await fetchGet(`${URLS.API_GATEWAY_BASE_URL}/${ENDPOINTS.API_GATEWAY.MOVIES.GET_MOVIES}`);
    if (moviesResponse.ok) {
      const movies = await moviesResponse.json();
      dispatch({ type: APPLICATION_ACTIONS_CONSTS.SET_MOVIES, payload: movies });
    }
    else {
      dispatch({ type: APPLICATION_ACTIONS_CONSTS.SET_MOVIES, payload: [] });
    }
  }
  catch (error) {
    dispatch({ type: APPLICATION_ACTIONS_CONSTS.SET_MOVIES, payload: [] });
    console.error("Error fetching movies:", error);
  }
  finally {
    dispatch({ type: APPLICATION_ACTIONS_CONSTS.SET_SPINNING, payload: false });
  }
}



export const getShowingMovies = async (
  apiClient: InternalApiClient,
  dispatch: React.Dispatch<ApplicationContextActions>,
  date: string,
  setLoading: (value: boolean) => void) => {
  const { fetchGet } = apiClient;

  try {
    setLoading(true);
    var result = await fetchGet(`${URLS.API_GATEWAY_BASE_URL}/${ENDPOINTS.API_GATEWAY.MOVIES.GET_SHOWTIMES}?date=${date}`);
    if (result.ok) {
      var data: MovieShowTimes[] = await result.json();
      dispatch({ type: APPLICATION_ACTIONS_CONSTS.GET_SHOWING_MOVIES, payload: data });
    } else {
      dispatch({ type: APPLICATION_ACTIONS_CONSTS.GET_SHOWING_MOVIES, payload: [] });
    }

  } catch (error) {
    console.error(error);
    message.error(ERRORS.GENERIC_API_ERROR);
    dispatch({ type: APPLICATION_ACTIONS_CONSTS.GET_SHOWING_MOVIES, payload: [] });
  }
  finally {
    setLoading(false);
  }
};