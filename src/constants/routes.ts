export const ROUTES = {
  BOOKING: 'booking',
  SIGN_IN: 'signin',
  SHOWING: 'showing',
  SHOWTIMES: 'showtimes',
  TICKETS: 'tickets',
  ADMIN_PORTAL: {
    HOME: 'admin-portal',
    MOVIES: 'admin-portal/movies',  
  }
} as const;

export type RouteKeys = keyof typeof ROUTES;