import { APPLICATION_ACTIONS_CONSTS } from "../action-constants/application";
import { ApplicationContextActions } from "../actions-types/application-actions";
import { ApplicationContextState } from "../states/application";

export const applicationReducer = (state: ApplicationContextState, action: ApplicationContextActions): ApplicationContextState => {
  switch (action.type) {
    case APPLICATION_ACTIONS_CONSTS.SET_MOVIES:
      return {
        ...state,
        movies: action.payload
      };
    case APPLICATION_ACTIONS_CONSTS.GET_MOVIE:
      return {
        ...state,
        movie: action.payload
      };
    case APPLICATION_ACTIONS_CONSTS.SET_HALLS:
      return {
        ...state,
        halls: action.payload
      };
    case APPLICATION_ACTIONS_CONSTS.GET_SHOW_TIMES:
      return {
        ...state,
        showTimes: action.payload
      };
    case APPLICATION_ACTIONS_CONSTS.GET_SHOWING_MOVIES:
      return {
        ...state,
        showingMovies: action.payload
      };
    case APPLICATION_ACTIONS_CONSTS.SET_SPINNING:
      return {
        ...state,
        spinning: action.payload
      };
    case APPLICATION_ACTIONS_CONSTS.GET_SHOW_TIME_DETAILS:
      return {
        ...state,
        showTimeDetails: action.payload
      };
    case APPLICATION_ACTIONS_CONSTS.SET_ACTIVE_ORDER:
      return {
        ...state,
        activeOrderSummary: action.payload
      };
    case APPLICATION_ACTIONS_CONSTS.SET_PORTAL_SETTINGS:
      return {
        ...state,
        portalSettings: action.payload
      };
    default:
      return state;
  }
};