/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-no-constructed-context-values */
import React, { createContext, useEffect, useReducer } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../firebase/config';

export const AuthContext = createContext();

const authReducer = (state, action) => {
  switch (action.type) {
    case 'AUTH_ON_LOAD':
    case 'SIGNIN':
      return { user: action.payload, authIsReady: true };
    case 'LOGOUT':
      return { user: null };
    default:
      return state;
  }
};

export const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, { user: null, authIsReady: false });

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (firebaseUser) => {
      dispatch({ type: 'AUTH_ON_LOAD', payload: firebaseUser });
    });

    return () => {
      unsub();
    };
  }, []);

  console.log(state);

  return (
    <AuthContext.Provider value={{ currentUser: state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};
