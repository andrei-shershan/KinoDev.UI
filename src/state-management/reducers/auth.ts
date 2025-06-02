import { AUTH_ACTIONS_CONSTS } from "../action-constants/auth";
import { AuthActionTypes } from "../actions-types/auth";
import { AuthState } from "../states/auth";

export const authReducer = (state: AuthState, action: AuthActionTypes): AuthState => {
    switch (action.type) {
        case AUTH_ACTIONS_CONSTS.SET_ACCESS_TOKEN:
            return {
                ...state,
                accessToken: action.payload,
                isAuthenticated: true
            };
        case AUTH_ACTIONS_CONSTS.CLEAR_AUTH:
            return {
                ...state,
                accessToken: undefined,
                isAuthenticated: false
            };
        default:
            return state;
    }
};