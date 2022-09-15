import { useContext, useState } from 'react';
import { FacebookAuthProvider, signInWithPopup } from 'firebase/auth';
import { auth } from '../firebase/config';
import { AuthContext } from '../context/AuthContext';
import { useSigninGoogle } from './useSigninGoogle';

export const useSigninFacebook = () => {
  const { dispatch } = useContext(AuthContext);
  const { signInGoogle } = useSigninGoogle();
  const [facebookError, setFacebookError] = useState(false);

  const signInFacebook = async () => {
    try {
      const provider = new FacebookAuthProvider();
      const res = await signInWithPopup(auth, provider);

      console.log(res);

      if (res.user) {
        dispatch({ action: 'SIGNIN', payload: res.user });
      } else {
        throw new Error('failed to sign in');
      }
    } catch (err) {
      if (err.code === 'auth/account-exists-with-different-credential') {
        signInGoogle();
        setFacebookError(true);
        alert(' you are signed in with google aleardy\n please, continue with google');
      } else {
        console.warn(err);
      }
    }
  };

  return { signInFacebook, facebookError };
};
