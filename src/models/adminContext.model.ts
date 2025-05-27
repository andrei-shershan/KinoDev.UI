import { IHallSummary, IMovie, IShowTimeDetails } from "./applicationContext.model";

export interface IAdminContextState {
  movies: IMovie[],
  movie?: IMovie;
  halls: IHallSummary[],
  showTimes?: IShowTimeDetails[]
}

// TODO: use AdminActions from constants/adminActionTypes.ts
export type AdminContextActions =
  | { type: 'GET_MOVIES'; payload: IMovie[] }
  | { type: 'GET_MOVIE'; payload?: IMovie }
  | { type: 'GET_HALLS'; payload: IHallSummary[] }
  | { type: 'GET_SHOW_TIMES'; payload?: IShowTimeDetails[] }

export interface IAdminContext {
  state: IAdminContextState;
  dispatch: React.Dispatch<AdminContextActions>;
}
