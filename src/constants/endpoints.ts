export const ENDPOINTS = {
  AUTHENTICATION: {
    SIGN_IN: 'api/authentication/signin',
    REFRESH_TOKEN: 'api/authentication/refresh'
  },
  API_GATEWAY: {
    MOVIES: {
      GET_LIST: 'api/movies',
      GET_SHOWTIMES: 'api/movies/showing',
    },
    USERS: {
      DETAILS: 'api/users/details',
    },
    TEST: {
      MEDIATR: 'api/test/mediatr',
    }
  }
} as const;

export type EndpointKeys = keyof typeof ENDPOINTS;