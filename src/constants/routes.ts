export const ROUTES = {
  BOOKING: 'booking',
  SIGN_IN: 'signin',
  SHOWING: 'showing',
  SHOWTIMES: 'showtimes',
  TICKETS: 'tickets',
  ABOUT: 'about',
  OUR_CINEMA: 'our-cinema',
  ADMIN_PORTAL: {
    HOME: 'admin-portal',
    MOVIES: 'admin-portal/movies',  
    MOVIES_ADD: 'admin-portal/movies/add',
    SHOWTIMES: 'admin-portal/showtimes',
    SHOWTIMES_ADD: 'admin-portal/showtimes/add',
    HALLS: 'admin-portal/halls',
    HALLS_ADD: 'admin-portal/halls/add',
    USERS: 'admin-portal/users',
  },
} as const;

export type RouteKeys = keyof typeof ROUTES;