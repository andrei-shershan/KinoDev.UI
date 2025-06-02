import { IHallSummary, IMovie, IMovieShowTimes, IOrderSummary, IShowTimeDetails } from "../../models/api.models";
import { APPLICATION_ACTIONS_CONSTS } from "../action-constants/application";

export type ApplicationContextActions =
  | { type: typeof APPLICATION_ACTIONS_CONSTS.GET_MOVIES; payload: IMovie[] }
  | { type: typeof APPLICATION_ACTIONS_CONSTS.GET_MOVIE; payload?: IMovie }
  | { type: typeof APPLICATION_ACTIONS_CONSTS.GET_HALLS; payload: IHallSummary[] }
  | { type: typeof APPLICATION_ACTIONS_CONSTS.GET_SHOW_TIMES; payload?: IShowTimeDetails[] }
  | { type: typeof APPLICATION_ACTIONS_CONSTS.GET_SHOWING_MOVIES; payload: IMovieShowTimes[] }
  | { type: typeof APPLICATION_ACTIONS_CONSTS.SET_SPINNING; payload: boolean }
  | { type: typeof APPLICATION_ACTIONS_CONSTS.GET_SHOW_TIME_DETAILS; payload: IShowTimeDetails }
  | { type: typeof APPLICATION_ACTIONS_CONSTS.SET_ACTIVE_ORDER; payload: IOrderSummary | undefined };





