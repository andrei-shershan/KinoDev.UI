import { IHall, IMovie } from "./applicationContext.model";

export interface IAdminContextState {
  movies: IMovie[],
  movie?: IMovie;
  halls: IHall[]
}

export type AdminContextActions =
  | { type: 'GET_MOVIES'; payload: IMovie[] }
  | { type: 'GET_MOVIE'; payload?: IMovie }
  | { type: 'GET_HALLS'; payload: IHall[] };

export interface IAdminContext {
  state: IAdminContextState;
  dispatch: React.Dispatch<AdminContextActions>;
}
