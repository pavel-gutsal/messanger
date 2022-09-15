import {
  updateDoc,
  doc,
  arrayUnion,
  serverTimestamp,
  Timestamp,
  arrayRemove,
} from 'firebase/firestore';
import { db } from '../firebase/config';

export const useFireStore = () => {
  const addMessage = async (chatRoomID, obj) => {
    const id = `${Math.random()}`;

    const newMessage = { ...obj, id, date: Timestamp.now() };

    try {
      await updateDoc(doc(db, 'chats', chatRoomID), {
        messages: arrayUnion(newMessage),
      });

      let str = 'picture';

      if (!obj.containsImage) {
        str = obj.text.slice(0, 50);

        if (str.length === 50) {
          str = `${str} ...`;
        }
      }

      await updateDoc(doc(db, 'userChats', chatRoomID), {
        'lastMessage.message': str,
        'lastMessage.createdAt': serverTimestamp(),
        'lastMessage.senderId': obj.senderId,
      });
    } catch (err) {
      console.warn(err);
    }
  };

  const deleteMessage = async (chatRoomID, post) => {
    try {
      await updateDoc(doc(db, 'chats', chatRoomID), {
        messages: arrayRemove(post),
      });
    } catch (err) {
      console.warn(err);
    }
  };

  return { addMessage, deleteMessage };
};
