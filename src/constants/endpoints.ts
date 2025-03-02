export const ENDPOINTS = {
  AUTHENTICATION: {
    SIGN_IN: 'api/authentication/signin',
    REFRESH_TOKEN: 'api/authentication/refresh'
  },
  API_GATEWAY: {
    USERS: {
      DETAILS: 'api/users/details',
    }
  }
} as const;

export type EndpointKeys = keyof typeof ENDPOINTS;