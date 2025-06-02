import { AuthActionTypes } from "../actions-types/auth";
import { AuthState } from "../states/auth";

export interface AuthContextType {
    state: AuthState;
    dispatch: React.Dispatch<AuthActionTypes>;
}