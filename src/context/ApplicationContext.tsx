import React, { createContext, useContext, useReducer } from 'react';
import { ApplciationContextActions, IApplicationContext, IApplicationContextState } from '../models/applicationContext.model';

const initialState: IApplicationContextState = {
  showingMovies: [],
  spinning: false
};

const authReducer = (state: IApplicationContextState, action: ApplciationContextActions): IApplicationContextState => {
  switch (action.type) {
    case 'GET_SHOWING_MOVIES':
      return {
        ...state,
        showingMovies: action.payload
      };
    case 'SET_SPINNING':
      return {
        ...state,
        spinning: action.payload
      };
    case 'GET_SHOW_TIME_DETAILS':
      return {
        ...state,
        showTimeDetails: action.payload
      };
    default:
      return state;
  }
};

const ApplicationContext = createContext<IApplicationContext | undefined>(undefined);

export const ApplicationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  return (
    <ApplicationContext.Provider value={{ state, dispatch }}>
      {children}
    </ApplicationContext.Provider>
  );
};

export const useApplicationContext = () => {
  const context = useContext(ApplicationContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context
};
