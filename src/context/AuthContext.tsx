import React, { createContext, useContext, useReducer } from 'react';
import { AuthAction, IAuthContext, IAuthState } from '../models/authContext.model';

const initialState: IAuthState = {
    accessToken: undefined,
    isAuthenticated: false
};

const authReducer = (state: IAuthState, action: AuthAction): IAuthState => {
    switch (action.type) {
        case 'SET_ACCESS_TOKEN':
            return {
                ...state,
                accessToken: action.payload,
                isAuthenticated: true
            };
        case 'CLEAR_AUTH':
            return {
                ...state,
                accessToken: undefined,
                isAuthenticated: false
            };
        default:
            return state;
    }
};

const AuthContext = createContext<IAuthContext | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [state, dispatch] = useReducer(authReducer, initialState);

    return (
        <AuthContext.Provider value={{ state, dispatch }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuthContext = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context
};
