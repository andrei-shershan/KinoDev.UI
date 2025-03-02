export const ROUTES = {
  MAIN_PORTAL: {
    SIGN_IN: 'signin',
  },
  ADMIN_PORTAL: {

  }
} as const;

export type RouteKeys = keyof typeof ROUTES;