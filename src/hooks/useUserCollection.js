/* eslint-disable no-unused-vars */
import { useState, useEffect } from 'react';
import { collection, onSnapshot } from 'firebase/firestore';
import { db } from '../firebase/config';

export const useUserCollection = (currentUser) => {
  const [userList, setUserList] = useState(null);
  const [userChatList, setUserChatList] = useState(null);

  useEffect(() => {
    const unsubUserList = onSnapshot(collection(db, 'users'), (document) => {
      const result = [];

      document.forEach((doc) => {
        result.push({ ...doc.data() });
      });

      setUserList(result);
    });

    const unsubUserChats = onSnapshot(collection(db, 'userChats'), (document) => {
      const result = [];
      document.forEach((doc) => {
        result.push({ ...doc.data() });
      });
      const currentUserID = currentUser.user.uid;
      const filteredResult = result.filter((obj) => obj.user1.combinedID.includes(currentUserID));

      setUserChatList(filteredResult);
    });

    return () => {
      unsubUserList();
      unsubUserChats();
    };
  }, [currentUser]);

  return { userList, userChatList };
};
