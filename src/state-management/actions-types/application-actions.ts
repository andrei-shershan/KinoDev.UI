import { HallSummary, Movie, MovieShowTimes, OrderSummary, ShowTimeDetailsApiModel } from "../../models/api.models";
import { PortalSettings } from "../../models/portal-settings";
import { APPLICATION_ACTIONS_CONSTS } from "../action-constants/application";

export type ApplicationContextActions =
  | { type: typeof APPLICATION_ACTIONS_CONSTS.GET_MOVIES; payload: Movie[] }
  | { type: typeof APPLICATION_ACTIONS_CONSTS.GET_MOVIE; payload?: Movie }
  | { type: typeof APPLICATION_ACTIONS_CONSTS.GET_HALLS; payload: HallSummary[] }
  | { type: typeof APPLICATION_ACTIONS_CONSTS.GET_SHOW_TIMES; payload?: ShowTimeDetailsApiModel[] }
  | { type: typeof APPLICATION_ACTIONS_CONSTS.GET_SHOWING_MOVIES; payload: MovieShowTimes[] }
  | { type: typeof APPLICATION_ACTIONS_CONSTS.SET_SPINNING; payload: boolean }
  | { type: typeof APPLICATION_ACTIONS_CONSTS.GET_SHOW_TIME_DETAILS; payload: ShowTimeDetailsApiModel }
  | { type: typeof APPLICATION_ACTIONS_CONSTS.SET_ACTIVE_ORDER; payload: OrderSummary | undefined }
  | { type: typeof APPLICATION_ACTIONS_CONSTS.SET_PORTAL_SETTINGS; payload: PortalSettings | undefined };





