import { OrderState } from "./enums.model"

export interface Movie {
  id: number,
  name: string,
  description: string,
  releaseDate: Date,
  duration: number,
  url: string
}

export interface MovieWithShowTime extends Movie {
  time: Date
}

export interface Hall {
  id: number,
  name: string
}

export interface Seat {
  id: number,
  row: number,
  number: number
}

export interface ShowTimeDetailsApiModel {
  id: number,
  time: Date,
  price: number,
  movie: Movie,
  hall: Hall
}

export interface HallWithMovies {
  hall: Hall,
  movies: MovieWithShowTime[]
}

export interface ShowTimeForDate {
  date: Date,
  hallWithMovies: HallWithMovies[]
}

export interface MovieShowTimeDetails {
  id: number,
  hallId: number,
  hallName: string,
  time: Date,
  price: number,
  isSellingAvailable: boolean
}

export interface MovieShowTimes {
  id: number,
  name: string,
  description: string,
  releaseDate: Date,
  duration: number,
  url: string,
  moviesShowTimeDetails: MovieShowTimeDetails[]
}

export interface ShowTimeSeat {
  id: number,
  row: number,
  number: number,
  isAvailable: boolean
}

export interface ShowTimeSeats {
  id: number,
  hallId: number,
  time: Date,
  price: number,
  seats: ShowTimeSeat[]
}

export interface BokingStorageData extends ShowTimeSeats {
  movie: Movie,
  hall: Hall
}

export interface Order {
  id: string,
  cost: number,
  state: OrderState,
  createdAt: Date,
  completedAt: Date,
  ticket: Ticket[]
}

export interface Ticket {
  id: string,
  seatId: number,
  showTimeId: number,
  orderId: string,
}

export interface ShowTimeSummary {
  id: number,
  time: Date,
  hall: Hall,
  movie: Movie,
}

export interface TicketSummary {
  ticketId: string,
  seatId: number,
  row: number,
  number: number,
  price: number,
}

export interface OrderSummary {
  id: string,
  state: OrderState,
  orderCost: number,
  createdAt: Date,
  completedAt?: Date,
  showTimeSummary: ShowTimeSummary,
  tickets: TicketSummary[],
}

export interface HallSummary extends Hall {
  seats: Seat[]
}
