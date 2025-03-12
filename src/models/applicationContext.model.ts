export interface IMovieShowTimeDetails {
  id: number,
  hallId: number,
  hallName: string,
  time: Date,
  price: number,
  isSellingAvailable: boolean
}

export interface IMovieShowTimes {
  id: number,
  name: string,
  description: string,
  releaseDate: Date,
  duration: number,
  url: string,
  moviesShowTimeDetails: IMovieShowTimeDetails[]
}

export interface IApplicationContextState {
  showingMovies: IMovieShowTimes[],
  spinning: boolean,
}

export type ApplciationContextActions =
  | { type: 'GET_SHOWING_MOVIES'; payload: IMovieShowTimes[] }
  | { type: 'SET_SPINNING'; payload: boolean };

export interface IApplicationContext {
  state: IApplicationContextState;
  dispatch: React.Dispatch<ApplciationContextActions>;
}
