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

export interface IShowTimeSeat {
  id: number,
  row: number,
  number: number,
  isAvailable: boolean
}

export interface IShowTimeSeats {
  id: number,
  hallId: number,
  time: Date,
  price: number,
  seats: IShowTimeSeat[]
} 

export interface IBokingStorageData extends IShowTimeSeats {
  movie: IMovie,
  hall: IHall
}

export interface IApplicationContextState {
  showingMovies: IMovieShowTimes[],
  showTimeDetails?: IShowTimeDetails
  spinning: boolean,
}

export enum OrderState {
  NEW = 0,
  PENDING = 10,
  PROCESSING = 20,
  COMPLETED = 30,
  CANCELLED = 40
}

export interface IOrder{
  id: number,
  cost: number,
  state: OrderState,
  createdAt: Date,
  completedAt: Date,
  ticket: ITicket[]
}

export interface ITicket{
  id: number,
  seatId: number,
  showTimeId: number,
  orderId: number,
}

export type ApplciationContextActions =
  | { type: 'GET_SHOWING_MOVIES'; payload: IMovieShowTimes[] }
  | { type: 'SET_SPINNING'; payload: boolean }
  | { type: 'GET_SHOW_TIME_DETAILS'; payload: IShowTimeDetails };

export interface IApplicationContext {
  state: IApplicationContextState;
  dispatch: React.Dispatch<ApplciationContextActions>;
}
