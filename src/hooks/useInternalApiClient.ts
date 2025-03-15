import { AUTHENTICATION } from "../constants/authentication";
import { ENDPOINTS } from "../constants/endpoints";
import { URLS } from "../constants/urls";
import { useAuthContext } from "../context/AuthContext"
import { ROUTES } from "../constants/routes";

const MAX_RETRY = 1;

const getCsrfToken = (): string => {
  const match = document.cookie.match(/XSRF-TOKEN=([^;]+)/);
  return match ? match[1] : '';
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

    dispatch({ type: 'SET_ACCESS_TOKEN', payload: data[AUTHENTICATION.ACCESS_TOKEN] });
    return true;
  }

  const fetchPost = async (url: string, body: any, options: RequestInit = {}): Promise<Response> => {
    return fetchWithAccessToken(url, {
      ...options,
      method: 'POST',
      body: JSON.stringify(body)
    });
  }

  const fetchGet = async (url: string, options: RequestInit = {}): Promise<Response> => {
    return fetchWithAccessToken(url, options);
  }

  const fetchWithAccessToken = async (url: string, options: RequestInit = {}, accessToken: string | null = null, retry: number = MAX_RETRY): Promise<Response> => {
    const headers = {
      ...options.headers,
      'Content-type': 'application/json',
      'Authorization': `Bearer ${accessToken ?? state.accessToken}`,
    };

    const response = await fetch(`${url}`, {
      ...options,
      headers
    });

    if (response.status === 401 || response.status === 403) {
      if (retry >= 0) {
        retry--;

        const refreshTokenResult = await refreshToken();
        if (refreshTokenResult) {
          return await fetchWithAccessToken(url, options, refreshTokenResult, retry);
        }
      }

      dispatch({ type: 'CLEAR_AUTH' });

      window.location.href = `${URLS.MAIN_PORTAL_URL}/${ROUTES.SIGN_IN}`;
    }

    return response;
  }

  return { fetchWithAccessToken, fetchPost, fetchSignIn, refreshToken };
}