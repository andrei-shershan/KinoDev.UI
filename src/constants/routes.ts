export const ROUTES = {
  SIGN_IN: 'signin',
  SHOWING: 'showing',
  SHOWTIMES: 'showtimes',
  ADMIN_PORTAL: {
    HOME: 'admin-portal',
    MOVIES: 'admin-portal/movies',  
  }
} as const;

export type RouteKeys = keyof typeof ROUTES;