import React, { createContext, useContext, useReducer } from 'react';
import { AdminContextActions, IAdminContext, IAdminContextState } from '../models/adminContext.model';
import { AdminActions } from '../constants/adminActionTypes';

const initialState: IAdminContextState = {
  movies: [],
  halls: [],
};

const authReducer = (state: IAdminContextState, action: AdminContextActions): IAdminContextState => {
  switch (action.type) {
    case AdminActions.GET_MOVIES:
      return {
        ...state,
        movies: action.payload
      };
    case AdminActions.GET_MOVIE:
      return {
        ...state,
        movie: action.payload
      };
    case AdminActions.GET_HALLS:
      return {
        ...state,
        halls: action.payload
      };
    case AdminActions.GET_SHOW_TIMES:
      return {
        ...state,
        showTimes: action.payload
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
