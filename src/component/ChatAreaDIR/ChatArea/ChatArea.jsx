import React, { useContext } from 'react';
import { AuthContext } from '../../../context/AuthContext';
import { ChatRoomContext } from '../../../context/ChatRoomContext';
import { ChatForm } from '../ChatForm/ChatForm';
import { Messages } from '../Messages/Messages';
import './ChatArea.scss';

export const ChatArea = () => {
  const { currentUser } = useContext(AuthContext);
  const { chatRoom } = useContext(ChatRoomContext);

  return (
    <div className="ChatArea">
      {
        chatRoom.chatRoomID ? (
          <div className="ChatArea__wrapper">
            <Messages chatRoom={chatRoom} currentUser={currentUser.user} />
            <ChatForm currentUserID={currentUser.user.uid} chatRoomID={chatRoom.chatRoomID} />
          </div>
        ) : (
          <div className="ChatArea__empty">
            <h1 className="ChatArea__emptyText">Select a chat to start messaging</h1>
          </div>
        )
      }
    </div>
  );
};
