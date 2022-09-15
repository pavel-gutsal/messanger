import {
  // collection,
  // addDoc,
  getDoc,
  setDoc, doc,
} from 'firebase/firestore';
import { db } from '../firebase/config';

export const useCreateNewUser = () => {
  const createCatalog = async (user) => {
    const res = await getDoc(doc(db, 'users', user.uid));
    if (!res.exists()) {
      const newUser = {
        uid: user.uid,
        displayName: user.displayName,
        email: user.email,
        photoURL: user.photoURL,
      };

      await setDoc(doc(db, 'users', user.uid), newUser);
      console.log('new user created');
    } else {
      console.log('skip');
    }
  };

  return { createCatalog };
};
