import { AUTHENTICATION } from '../constants/authentication';
import { ENDPOINTS } from '../constants/endpoints';
import { ROUTES } from '../constants/routes';
import { URLS } from '../constants/urls';

class HttpClient {
  private maxRetries: number = 1;
  private navigateCallback: ((path: string) => void) | null = null;

  setNavigateCallback(callback: (path: string) => void) {
    this.navigateCallback = callback;
  }

  private async fetchWithAuth(url: string, options: RequestInit = {}): Promise<Response> {
    const accessToken = localStorage.getItem(AUTHENTICATION.ACCESS_TOKEN);
    const headers = {
      ...options.headers,
      'Content-type': 'application/json',
      'Authorization': `Bearer ${accessToken}`
    };

    return fetch(`${url}`, {
      ...options,
      headers
    });
  }

  private async refreshToken(): Promise<boolean> {
    const refreshToken = localStorage.getItem(AUTHENTICATION.REFRESH_TOKEN);
    const accessToken = localStorage.getItem(AUTHENTICATION.ACCESS_TOKEN);

    if (!refreshToken || !accessToken) {
      return false;
    }

    try {
      const response = await fetch(`${URLS.AUTH_BASE_URL}/${ENDPOINTS.AUTHENTICATION.REFRESH_TOKEN}`, {

        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          [`${AUTHENTICATION.ACCESS_TOKEN}`]: accessToken,
          [`${AUTHENTICATION.REFRESH_TOKEN}`]: refreshToken
        }),
      });

      if (response.ok) {
        const data = await response.json();
        localStorage.setItem(AUTHENTICATION.ACCESS_TOKEN, data.accessToken);
        localStorage.setItem(AUTHENTICATION.REFRESH_TOKEN, data.refreshToken);
        return true;
      }

      return false;
    } catch {
      return false;
    }
  }

  async fetch(url: string, options: RequestInit = {}): Promise<Response> {
    let retries = 0;

    while (retries <= this.maxRetries) {
      const response = await this.fetchWithAuth(url, options);

      if (response.status !== 401 && response.status !== 403) {
        return response;
      }

      if (retries === this.maxRetries) {
        localStorage.removeItem(AUTHENTICATION.ACCESS_TOKEN);
        localStorage.removeItem(AUTHENTICATION.REFRESH_TOKEN);
        if (this.navigateCallback) {
          this.navigateCallback(`/${ROUTES.MAIN_PORTAL.SIGN_IN}`);
        }
        return response;
      }

      const refreshSuccess = await this.refreshToken();
      if (!refreshSuccess) {
        localStorage.removeItem(AUTHENTICATION.ACCESS_TOKEN);
        localStorage.removeItem(AUTHENTICATION.REFRESH_TOKEN);
        if (this.navigateCallback) {
          this.navigateCallback(`/${ROUTES.MAIN_PORTAL.SIGN_IN}`);
        }
        return response;
      }

      retries++;
    }

    throw new Error('Max retries reached');
  }
}

export const httpClient = new HttpClient();
