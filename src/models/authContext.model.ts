export interface IAuthState {
    accessToken?: string;
    isAuthenticated: boolean;
}

export type AuthAction = 
    | { type: 'SET_ACCESS_TOKEN'; payload: string }
    | { type: 'CLEAR_AUTH' };

export interface IAuthContext {
    state: IAuthState;
    dispatch: React.Dispatch<AuthAction>;
}
