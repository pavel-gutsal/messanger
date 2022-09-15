/* eslint-disable consistent-return */
/* eslint-disable react/jsx-no-constructed-context-values */
/* eslint-disable react/prop-types */
import React, { createContext, useReducer, useEffect } from 'react';
import { onSnapshot, doc } from 'firebase/firestore';
import { db } from '../firebase/config';

export const ChatRoomContext = createContext();

const chatRoomReducer = (state, action) => {
  switch (action.type) {
    case ('CHOOSE_ROOM'):
      return {
        ...state,
        chatRoomID: action.payload.combinedID,
        anotherPerson: action.payload.anotherUser,
      };
    case ('SUBSCRIBE_TO_ROOM'):
      return { ...state, chatRoomContent: action.payload.messages };
    default:
      return state;
  }
};

export const ChatRoomContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(chatRoomReducer, {
    chatRoomContent: null,
    chatRoomID: null,
    anotherPerson: null,
  });

  useEffect(() => {
    if (!state.chatRoomID) {
      return;
    }

    const unsub = onSnapshot(doc(db, 'chats', state.chatRoomID), (document) => {
      dispatch({ type: 'SUBSCRIBE_TO_ROOM', payload: document.data() });
    });

    return () => {
      unsub();
    };
  }, [state.chatRoomID]);

  return (
    <ChatRoomContext.Provider value={{ chatRoom: state, dispatch }}>
      {children}
    </ChatRoomContext.Provider>
  );
};
