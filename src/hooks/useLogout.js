import { useContext } from 'react';
import { signOut } from 'firebase/auth';
import { auth } from '../firebase/config';
import { AuthContext } from '../context/AuthContext';

export const useLogOut = () => {
  const { dispatch } = useContext(AuthContext);

  const logOut = async () => {
    try {
      await signOut(auth);

      dispatch({ action: 'LOGOUT' });
    } catch (err) {
      console.warn(err);
    }
  };

  return { logOut };
};
