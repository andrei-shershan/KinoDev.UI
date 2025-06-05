import React, { createContext, useContext, useReducer } from 'react';
import { AuthState } from '../states/auth';
import { authReducer } from '../reducers/auth';
import { AuthContextType } from '../contexts/auth';

const initialState: AuthState = {
    accessToken: undefined,
    isAuthenticated: false
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

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
