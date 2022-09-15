/* eslint-disable react/prop-types */
import React, { useContext } from 'react';
import { setDoc, getDoc, doc } from 'firebase/firestore';
import { ChatRoomContext } from '../../../context/ChatRoomContext';
import { db } from '../../../firebase/config';
import './UserSidebar.scss';

export const UserSidebar = ({
  userSidebarInfo, currentUser, setSideBarOpen,
}) => {
  const { dispatch } = useContext(ChatRoomContext);
  const chooseChatRoomHandler = async () => {
    const combinedID = currentUser.uid > userSidebarInfo.uid
      ? `${currentUser.uid}${userSidebarInfo.uid}`
      : `${userSidebarInfo.uid}${currentUser.uid}`;

    try {
      const res = await getDoc(doc(db, 'chats', combinedID));

      if (!res.exists()) {
        await setDoc(doc(db, 'chats', combinedID), { messages: [] });

        const userChatObject = {
          user1: {
            combinedID,
            photoURL: userSidebarInfo.photoURL,
            displayName: userSidebarInfo.displayName,
            email: userSidebarInfo.email,
            uid: userSidebarInfo.uid,
          },
          user2: {
            combinedID,
            photoURL: currentUser.photoURL,
            displayName: currentUser.displayName,
            email: currentUser.email,
            uid: currentUser.uid,
          },
          lastMessage: {
            message: null,
            createdAt: null,
            senderId: null,
          },
        };

        await setDoc(doc(db, 'userChats', combinedID), userChatObject);
      }

      const roomAdditionalInfo = {
        combinedID,
        anotherUser: {
          displayName: userSidebarInfo.displayName,
          photoURL: userSidebarInfo.photoURL,
        },
      };

      dispatch({ type: 'CHOOSE_ROOM', payload: roomAdditionalInfo });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="UserSidebar">
      <button
        className="UserSidebar__btn"
        type="button"
        onClick={() => {
          chooseChatRoomHandler();
          setSideBarOpen(false);
        }}
      >
        <img
          src={userSidebarInfo.photoURL}
          alt="avatar"
          className="UserSidebar__img"
        />
        <div className="UserSidebar__text">
          <h3 className="UserSidebar__user">{userSidebarInfo.displayName}</h3>
        </div>
      </button>
    </div>
  );
};
