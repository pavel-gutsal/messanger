import { useContext } from 'react';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { auth } from '../firebase/config';
import { AuthContext } from '../context/AuthContext';
import { useCreateNewUser } from './useCreateNewUser';

export const useSigninGoogle = () => {
  const { dispatch } = useContext(AuthContext);
  const { createCatalog } = useCreateNewUser();

  const signInGoogle = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const res = await signInWithPopup(auth, provider);

      console.log(res.user);
      if (res.user) {
        dispatch({ action: 'SIGNIN', payload: res.user });
      } else {
        throw new Error('failed to sign in');
      }

      createCatalog(res.user);
    } catch (err) {
      console.warn(err);
    }
  };

  return { signInGoogle };
};
