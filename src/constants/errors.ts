export const ERRORS = {
  GENERIC_API_ERROR: 'Something went wrong. Please try again later.',
} as const;

export type ErrorKeys = keyof typeof ERRORS;