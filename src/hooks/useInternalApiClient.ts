import { AUTHENTICATION } from "../constants/authentication";
import { ENDPOINTS } from "../constants/endpoints";
import { URLS } from "../constants/urls";
import { STORAGE_KEYS } from "../constants/storageKeys";
import { useAuthContext } from "../state-management/providers/AuthContextProvider";
import { getCsrfToken } from "../utils/storage";

const MAX_RETRY = 1;

function isFormData(x: any): x is FormData {
  return x instanceof FormData;
}

export interface InternalApiClient {
  fetchGet: (url: string, options?: RequestInit) => Promise<Response>;
  fetchPost: (url: string, body?: any, options?: RequestInit) => Promise<Response>;
  fetchDelete: (url: string, options?: RequestInit) => Promise<Response>;
  fetchSignIn: (email: string, password: string) => Promise<boolean | null>;
  refreshToken: () => Promise<any>;
}

export const useInternalApiClient = () => {
  const { state, dispatch } = useAuthContext();

  const refreshToken = async () => {
    const response = await fetch(`${URLS.AUTH_BASE_URL}/${ENDPOINTS.AUTHENTICATION.REFRESH_TOKEN}`, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
        'X-CSRF-Token': getCsrfToken()
      },
      credentials: 'include',
    });

    const data = await response.json();
    if (data) {
      dispatch({ type: 'SET_ACCESS_TOKEN', payload: data[AUTHENTICATION.ACCESS_TOKEN] });
      return data[AUTHENTICATION.ACCESS_TOKEN];
    }

    return null;
  };

  // TODO: fetch post, move to service
  const fetchSignIn = async (email: string, password: string) => {
    const response = await fetch(`${URLS.AUTH_BASE_URL}/${ENDPOINTS.AUTHENTICATION.SIGN_IN}`, {
      body: JSON.stringify({
        email,
        password,
      }),
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      credentials: 'include',
    });

    if (!response.ok) {
      console.error('Sign in failed');
      return null;
    }

    const data = await response.json();
    if (!data) {
      console.log('Invalid data!');
      return false;
    }

    localStorage.setItem(STORAGE_KEYS.XSRF_TOKEN, data[STORAGE_KEYS.XSRF_TOKEN]);

    dispatch({ type: 'SET_ACCESS_TOKEN', payload: data[AUTHENTICATION.ACCESS_TOKEN] });
    return true;
  }

  const fetchDelete = async (url: string, options: RequestInit = {}): Promise<Response> => {
    return fetchWithAccessToken(url, {
      ...options,
      method: 'DELETE',
    });
  }

  const fetchPost = async (url: string, body: any = {}, options: RequestInit = {}): Promise<Response> => {
    const isFormPayload = isFormData(body);

    return fetchWithAccessToken(url, {
      ...options,
      method: 'POST',
      body: isFormPayload ? body : JSON.stringify(body),
    }, !isFormPayload);
  }

  const fetchGet = async (url: string, options: RequestInit = {}): Promise<Response> => {
    return fetchWithAccessToken(url, {
      ...options,
      method: 'GET',
    });
  }

  // TODO: should be just fetchGet
  const fetchWithAccessToken = async (url: string, options: RequestInit = {}, useAppJsonContent: boolean = true, accessToken: string | null = null, retry: number = MAX_RETRY): Promise<Response> => {

    const headers = useAppJsonContent
      ? {
        ...options.headers,
        'Content-type': 'application/json',
        'Authorization': `Bearer ${accessToken ?? state.accessToken}`,
      } :
      {
        ...options.headers,
        'Authorization': `Bearer ${accessToken ?? state.accessToken}`,
      };

    const response = await fetch(`${url}`, {
      ...options,
      credentials: 'include',
      headers
    });

    if (response.status === 401 || response.status === 403) {
      if (retry >= 0) {
        retry--;

        const refreshTokenResult = await refreshToken();
        if (refreshTokenResult) {
          return await fetchWithAccessToken(url, options, useAppJsonContent, refreshTokenResult, retry);
        }
      }

      dispatch({ type: 'CLEAR_AUTH' });

      window.location.href = `${URLS.MAIN_PORTAL_URL}`;
    }

    return response;
  }

  return { fetchGet, fetchPost, fetchDelete, fetchSignIn, refreshToken };
}