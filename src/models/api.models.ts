import { OrderState } from "./enums.model"

export interface IMovie {
  id: number,
  name: string,
  description: string,
  releaseDate: Date,
  duration: number,
  url: string
}

export interface IMovieWithShowTime extends IMovie {
  time: Date
}

export interface IHall {
  id: number,
  name: string
}

export interface ISeat {
  id: number,
  row: number,
  number: number
}

export interface IShowTimeDetails {
  id: number,
  time: Date,
  price: number,
  movie: IMovie,
  hall: IHall
}

export interface IHallWithMovies {
  hall: IHall,
  movies: IMovieWithShowTime[]
}

export interface IShowTimeForDate {
  date: Date,
  hallWithMovies: IHallWithMovies[]
}

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

export interface IOrder {
  id: string,
  cost: number,
  state: OrderState,
  createdAt: Date,
  completedAt: Date,
  ticket: ITicket[]
}

export interface ITicket {
  id: string,
  seatId: number,
  showTimeId: number,
  orderId: string,
}

export interface IShowTimeSummary {
  id: number,
  time: Date,
  hall: IHall,
  movie: IMovie,
}

export interface ITicketSummary {
  ticketId: string,
  seatId: number,
  row: number,
  number: number,
  price: number,
}

export interface IOrderSummary {
  id: string,
  state: OrderState,
  orderCost: number,
  createdAt: Date,
  completedAt?: Date,
  showTimeSummary: IShowTimeSummary,
  tickets: ITicketSummary[],
}

export interface IHallSummary extends IHall {
  seats: ISeat[]
}
