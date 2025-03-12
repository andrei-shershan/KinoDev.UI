import { useState, FormEvent, useEffect } from 'react';
import { ENDPOINTS } from '../constants/endpoints';
import { URLS } from '../constants/urls';
import { ROLES } from '../constants/roles';
import { useAuthContext } from '../context/AuthContext';
import { useInternalApiClient } from '../hooks/useInternalApiClient';

interface SignInForm {
  email: string;
  password: string;
}

export const SignIn = () => {
  const { state } = useAuthContext();
  const { fetchSignIn, fetchWithAccessToken } = useInternalApiClient();

  useEffect(() => {
    const makeRequest = async () => {
      const userDetailsResponse = await fetchWithAccessToken(`${URLS.API_GATEWAY_BASE_URL}/${ENDPOINTS.API_GATEWAY.USERS.DETAILS}`);
      if (userDetailsResponse.ok) {
        const userDetails = await userDetailsResponse.json();

        if (userDetails.find((x: string) => x === ROLES.ADMIN)) {
          window.location.href = URLS.ADMIN_PORTAL_URL;
        }
        else {
          window.location.href = URLS.MAIN_PORTAL_URL;
        }
      }
    }

    if (state.accessToken) {
      makeRequest();
    }
  }, [state.accessToken]);

  const [formData, setFormData] = useState<SignInForm>({
    email: '',
    password: ''
  });

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetchSignIn(formData.email, formData.password);
      if (!response) {
        throw new Error('Sign in failed');
      }
    } catch (error) {
      console.error('Login failed:', error instanceof Error ? error.message : 'Unknown error');
      // You might want to show an error message to the user here
    }
  };

  return (
    <div className="signin-container">
      <div className="signin-form-container">
        <h2 className="signin-title">
          Sign in to your account
        </h2>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="email" className="sr-only">Email address</label>
            <input
              id="email"
              name="email"
              type="email"
              required
              className="input-field"
              placeholder="Email address"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            />
          </div>
          <div>
            <label htmlFor="password" className="sr-only">Password</label>
            <input
              id="password"
              name="password"
              type="password"
              required
              className="input-field"
              placeholder="Password"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            />
          </div>

          <button
            type="submit"
            className="signin-button"
          >
            Sign in
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignIn;
