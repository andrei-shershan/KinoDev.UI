import { useState, FormEvent } from 'react';
import { httpClient } from '../../services/httpClient';
import { ENDPOINTS } from '../../constants/endpoints';
import { URLS } from '../../constants/urls';
import { ROLES } from '../../constants/roles';
import { AUTHENTICATION } from '../../constants/authentication';

interface SignInForm {
  email: string;
  password: string;
}

export const SignIn = () => {
  const [formData, setFormData] = useState<SignInForm>({
    email: '',
    password: ''
  });

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    try {
      const response = await httpClient.fetch(`${URLS.AUTH_BASE_URL}/${ENDPOINTS.AUTHENTICATION.SIGN_IN}`, {
        body: JSON.stringify({
          email: formData.email,
          password: formData.password
        }),
        method: 'POST'
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Sign in failed');
      }

      // Handle successful login
      console.log('Login successful:', data);

      localStorage.setItem(AUTHENTICATION.ACCESS_TOKEN, data.access_token);
      localStorage.setItem(AUTHENTICATION.REFRESH_TOKEN, data.refresh_token);

      const userDetailsResponse = await httpClient.fetch(`${URLS.API_GATEWAY_BASE_URL}/${ENDPOINTS.API_GATEWAY.USERS.DETAILS}`);
      if (userDetailsResponse.ok) {
        const userDetails = await userDetailsResponse.json();

        console.log(userDetails);
        if (userDetails.find((x: string) => x === ROLES.ADMIN)) {
          window.location.href = URLS.ADMIN_PORTAL_URL;
        }
        else {
          window.location.href = URLS.MAIN_PORTAL_URL;
        }
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
