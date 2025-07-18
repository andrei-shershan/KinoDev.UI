export const URLS = {
  AUTH_BASE_URL: import.meta.env.VITE_AUTH_BASE_URL,
  API_GATEWAY_BASE_URL: import.meta.env.VITE_API_GATEWAY_BASE_URL,
  MAIN_PORTAL_URL: import.meta.env.VITE_MAIN_PORTAL_URL,
  ADMIN_PORTAL_URL: import.meta.env.VITE_ADMIN_PORTAL_URL,
  PUBLIC_IMAGES_HOST: import.meta.env.VITE_PUBLIC_IMAGES_HOST,
  PUBLIC_IMAGES_STORE_ACCOUNT: import.meta.env.VITE_PUBLIC_IMAGES_STORE_ACCOUNT,
  PUBLIC_TICKETS_STORE_ACCOUNT: import.meta.env.VITE_PUBLIC_TICKETS_STORE_ACCOUNT,
} as const;

export type UrlKeys = keyof typeof URLS;
