import { useEffect, useState, FormEvent } from "react";
import { PORTALS_TYPES } from "../../constants/portalTypes";
import { useInternalApiClient } from "../../hooks/useInternalApiClient";
import MainLayout from "../../layouts/mainLayout";
import { useAuthContext } from "../../state-management/providers/AuthContextProvider";
import Button from "../../ui/Button";
import { InputType, SizeType, StyleType } from "../../ui/types";
import { Input } from "../../ui/Input";
import { getUserDetails } from "../../api-calls/users";
import { useApplicationContext } from "../../state-management/providers/AdminContextProvider";
import { APPLICATION_ACTIONS_CONSTS } from "../../state-management/action-constants/application";
import { message } from "antd";

export const SignIn = () => {
  const { state } = useAuthContext();
  const { dispatch } = useApplicationContext();
  const apiClient = useInternalApiClient();
  const { fetchSignIn } = apiClient;

  useEffect(() => {
    if (state.accessToken) {
      getUserDetails(apiClient);
    }
  }, [state.accessToken]);

  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    try {
      dispatch({ type: APPLICATION_ACTIONS_CONSTS.SET_SPINNING, payload: true });

      const response = await fetchSignIn(formData.email, formData.password);
      if (!response) {
        throw new Error('Sign in failed');
      }
    } catch (error) {
      message.error("Sign in failed. Please check your credentials and try again.")
      console.error('Login failed:', error instanceof Error ? error.message : 'Unknown error');
    }
    finally {
      dispatch({ type: APPLICATION_ACTIONS_CONSTS.SET_SPINNING, payload: false });
    };
  }

  return (
    <MainLayout portalType={PORTALS_TYPES.NONE} >
      <div className="signin-container">
        <div className="signin-form-container">
          <h2 className="signin-title">
            Sign in to your account
          </h2>
          <div>
            <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
              <div>
                <Input
                  type={InputType.Email}
                  id="email"
                  name="email"
                  required
                  placeholder="Email address"
                  labelText="Email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
              </div>
              <div>
                <Input
                  type={InputType.Password}
                  id="password"
                  name="password"
                  required
                  placeholder="Password"
                  labelText="Password"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                />
              </div>

              <Button
                type={"submit"}
                text="Sign in"
                style={StyleType.Primary}
                size={SizeType.Medium}
              />
            </form>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default SignIn;
