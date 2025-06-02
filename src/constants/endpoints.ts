export const ENDPOINTS = {
  API_GATEWAY: {
    HALLS: {
      GET_HALLS: 'api/halls',
    },
    MOVIES: {
      GET_MOVIES: 'api/movies',
      GET_SHOWTIMES: 'api/movies/showing',
    },
    ORDERS: {
      GET_ACTIVE: 'api/orders/active',
      CREATE: 'api/orders',
      COMPLETE_ORDER: 'api/orders/complete',
      CANCEL_ACTIVE: 'api/orders/active',
      COMPLETED: 'api/orders/completed',
      COMPLETED_EMAIL_VERIFICATION: 'api/orders/completed/verify-email',
      GET_COMPLETED_ORDER_COOKIE: 'api/orders/completed/cookie',
    },
    PAYMENTS: {
      CREATE_PAYMENT: 'api/payments',
    },
    SHOW_TIMES: {
      GET_SHOW_TIMES: 'api/showtimes',
      GET_SHOW_TIME_DETAILS: 'api/showtimes/details',
      GET_SHOW_TIME_SEATS: 'api/showtimes/seats',
      GET_SHOW_TIMES_SLOTS: 'api/showtimes/slots',
    },
    TEST: {
      MEDIATR: 'api/test/mediatr',
    },
    USERS: {
      DETAILS: 'api/users/details',
    },
    PORTAL_SETTINGS: 'api/portalsettings',
  },
  AUTHENTICATION: {
    REFRESH_TOKEN: 'api/authentication/refresh',
    SIGN_IN: 'api/authentication/signin'
  }
} as const;

export type EndpointKeys = keyof typeof ENDPOINTS;