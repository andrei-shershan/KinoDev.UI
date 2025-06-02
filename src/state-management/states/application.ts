import { IHallSummary, IMovie, IMovieShowTimes, IOrderSummary, IShowTimeDetails } from "../../models/api.models";

export interface ApplicationContextState {
  movies?: IMovie[],
  movie?: IMovie;
  halls?: IHallSummary[],
  showTimes?: IShowTimeDetails[],
  showingMovies?: IMovieShowTimes[],
  showTimeDetails?: IShowTimeDetails
  spinning: boolean
  activeOrderSummary?: IOrderSummary,
}