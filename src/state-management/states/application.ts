import { HallSummary, Movie, MovieShowTimes, OrderSummary, ShowTimeDetailsApiModel } from "../../models/api.models";
import { PortalSettings } from "../../models/portal-settings";

export interface ApplicationContextState {
  movies?: Movie[],
  movie?: Movie;
  halls?: HallSummary[],
  showTimes?: ShowTimeDetailsApiModel[],
  showingMovies?: MovieShowTimes[],
  showTimeDetails?: ShowTimeDetailsApiModel
  spinning: boolean
  activeOrderSummary?: OrderSummary,
  portalSettings?: PortalSettings,
}