import { HallSummary, Movie, MovieShowTimes, OrderSummary, ShowTimeDetailsApiModel } from "../../models/api.models";

export interface ApplicationContextState {
  movies?: Movie[],
  movie?: Movie;
  halls?: HallSummary[],
  showTimes?: ShowTimeDetailsApiModel[],
  showingMovies?: MovieShowTimes[],
  showTimeDetails?: ShowTimeDetailsApiModel
  spinning: boolean
  activeOrderSummary?: OrderSummary,
}