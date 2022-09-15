import React from 'react';
import { GoogleBtn } from '../../component/SignInComponents/GoogleBtn/GoogleBtn';
import { FacebookBtn } from '../../component/SignInComponents/FacebookBtn/FacebookBtn';
import { useSigninFacebook } from '../../hooks/useSigninFacebook';
import './SignIn.scss';

export const SignIn = () => {
  const { signInFacebook, facebookError } = useSigninFacebook();

  return (
    <div className="SignIn">
      <div className="SignIn__Form">
        <div className="SignIn__Logo-wrapper">
          <h3 className="SignIn__Logo">Messanger</h3>
          <img
            className="SignIn__LogoBG"
            src="./assets/logoBG.png"
            alt="background"
          />
        </div>
        <GoogleBtn />
        <h3 className="SignIn__textDevide">or</h3>
        {
          !facebookError && <FacebookBtn signInFacebook={signInFacebook} />
        }
        {
          facebookError && (
            <p className="SignIn__error">
              Ups 😨, you already created account with Google, please sign in with Google
            </p>
          )
        }
      </div>
      <div className="SignIn__footer">
        <a
          // eslint-disable-next-line max-len
          href="https://github.com/pavel-gutsal/react_phone-catalog/tree/solution"
          className="SignIn__link"
          target="blank"
        >
          <h1 className="SignIn__GitHub">
            GitHub
          </h1>
        </a>
        <div className="SignIn__copyright">
          <h3 className="SignIn__copyrightText">Managed with</h3>
          <img
            className="SignIn__firebasePic"
            src="./assets/firebase.svg"
            alt="firebase"
          />
        </div>
      </div>
    </div>
  );
};
