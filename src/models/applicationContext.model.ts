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

export interface IMovie {
  id: number,
  name: string,
  description: string,
  releaseDate: Date,
  duration: number,
  url: string
}

export interface IHall {
  id: number,
  name: string
}

export interface IShowTimeDetails {
  id: number,
  time: Date,
  price: number,
  movie: IMovie,
  hall: IHall
}

export interface IApplicationContextState {
  showingMovies: IMovieShowTimes[],
  showTimeDetails: IShowTimeDetails,
  spinning: boolean,
}


export type ApplciationContextActions =
  | { type: 'GET_SHOWING_MOVIES'; payload: IMovieShowTimes[] }
  | { type: 'SET_SPINNING'; payload: boolean }
  | { type: 'GET_SHOW_TIME_DETAILS'; payload: IShowTimeDetails };

export interface IApplicationContext {
  state: IApplicationContextState;
  dispatch: React.Dispatch<ApplciationContextActions>;
}
