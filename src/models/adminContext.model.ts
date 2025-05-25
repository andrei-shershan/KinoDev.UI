import { IMovie } from "./applicationContext.model";

export interface IAdminContextState {
  movies: IMovie[],
  movie?: IMovie;
}

export type AdminContextActions =
  | { type: 'GET_MOVIES'; payload: IMovie[] }
  | { type: 'GET_MOVIE'; payload?: IMovie };

export interface IAdminContext {
  state: IAdminContextState;
  dispatch: React.Dispatch<AdminContextActions>;
}
