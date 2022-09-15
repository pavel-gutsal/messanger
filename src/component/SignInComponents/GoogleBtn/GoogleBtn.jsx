import React from 'react';
import { useSigninGoogle } from '../../../hooks/useSigninGoogle';
import './GoogleBtn.scss';

export const GoogleBtn = () => {
  const { signInGoogle } = useSigninGoogle();

  return (
    <button
      className="GoogleBtn"
      type="button"
      onClick={() => {
        signInGoogle();
      }}
    >
      <div className="GoogleBtn__container">
        <img
          className="GoogleBtn__img"
          src="./assets/google.svg"
          alt="google.svg"
        />
      </div>
      <h3 className="GoogleBtn__header">Sign in with Google</h3>
    </button>
  );
};
