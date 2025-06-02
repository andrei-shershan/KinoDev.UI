import React, { createContext, useContext, useReducer } from 'react';
import { ApplicationContextState } from '../states/application';
import { ApplicationContextType } from '../contexts/application';
import { applicationReducer } from '../reducers/application-reducer';

const initialState: ApplicationContextState = {
  spinning: false,
};

const ApplicationContext = createContext<ApplicationContextType | undefined>(undefined);

export const ApplicationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(applicationReducer, initialState);

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
