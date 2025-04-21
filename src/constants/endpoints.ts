export const ENDPOINTS = {
  API_GATEWAY: {
    MOVIES: {
      GET_LIST: 'api/movies',
      GET_SHOWTIMES: 'api/movies/showing',
    },
    ORDERS: {
      GET_ACTIVE: 'api/orders/active',
      CREATE: 'api/orders',
      COMPLETE_ORDER: 'api/orders/complete',
    },
    PAYMENTS: {
      CREATE_PAYMENT: 'api/payments',
    },
    SHOW_TIMES: {
      GET_SHOW_TIME_DETAILS: 'api/showtimes/details',
      GET_SHOW_TIME_SEATS: 'api/showtimes/seats'
    },
    TEST: {
      MEDIATR: 'api/test/mediatr',
    },
    USERS: {
      DETAILS: 'api/users/details',
    }
  },
  AUTHENTICATION: {
    REFRESH_TOKEN: 'api/authentication/refresh',
    SIGN_IN: 'api/authentication/signin'
  }
} as const;

export type EndpointKeys = keyof typeof ENDPOINTS;