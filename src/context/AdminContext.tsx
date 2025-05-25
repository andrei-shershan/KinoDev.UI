import React, { createContext, useContext, useReducer } from 'react';
import { AdminContextActions, IAdminContext, IAdminContextState } from '../models/adminContext.model';

const initialState: IAdminContextState = {
  movies: []
};

const authReducer = (state: IAdminContextState, action: AdminContextActions): IAdminContextState => {
  switch (action.type) {
    case 'GET_MOVIES':
      return {
        ...state,
        movies: action.payload
      };
    case 'GET_MOVIE':
      return {
        ...state,
        movie: action.payload
      };
    default:
      return state;
  }
};

const AdminContext = createContext<IAdminContext | undefined>(undefined);

export const AdminProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  return (
    <AdminContext.Provider value={{ state, dispatch }}>
      {children}
    </AdminContext.Provider>
  );
};

export const useAdminContext = () => {
  const context = useContext(AdminContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context
};
