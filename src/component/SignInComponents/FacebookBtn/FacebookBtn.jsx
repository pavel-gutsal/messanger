/* eslint-disable react/prop-types */
import React from 'react';
import './FacebookBtn.scss';

export const FacebookBtn = ({ signInFacebook }) => {
  return (
    <button
      className="FacebookBtn"
      type="button"
      onClick={() => {
        signInFacebook();
      }}
    >
      <div className="FacebookBtn__container">
        <img
          className="FacebookBtn__img"
          src="./assets/facebook.svg"
          alt="google.svg"
        />
      </div>
      <h3 className="FacebookBtn__header">Sign in with Facebook</h3>
    </button>
  );
};
