import { STORAGE_KEYS } from "../constants/storageKeys";

export const getCsrfToken = (): string => {
  return localStorage.getItem(STORAGE_KEYS.XSRF_TOKEN) || '';
}
