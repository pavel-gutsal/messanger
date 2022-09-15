import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyCvcqXsiUJQmNfeU7SlCygIhTN4KyK3zFM',
  authDomain: 'messanger-app-1566f.firebaseapp.com',
  projectId: 'messanger-app-1566f',
  storageBucket: 'messanger-app-1566f.appspot.com',
  messagingSenderId: '795512332002',
  appId: '1:795512332002:web:85f7eb2060138b9c7648bb',
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
