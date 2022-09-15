/* eslint-disable prefer-destructuring */
/* eslint-disable react/prop-types */
import React, { useContext } from 'react';
import classNames from 'classnames';
import { ChatRoomContext } from '../../../context/ChatRoomContext';
import { timeStamp } from '../../../functions/timestamp';
import './ActiveChats.scss';
import '../UserSidebar/UserSidebar.scss';

export const ActiveChats = ({ currentUser, userChatList, setSideBarOpen }) => {
  const { dispatch } = useContext(ChatRoomContext);
  return (
    <div className="ActiveChats">
      {
        userChatList && userChatList?.length > 0 ? (
          userChatList.map((chat) => {
            const companion = chat.user1.uid === currentUser.uid
              ? chat.user2
              : chat.user1;
            const myLastMessage = chat.lastMessage.senderId === currentUser.uid;

            return (
              <button
                key={chat.user1.combinedID}
                className="UserSidebar__btn"
                type="button"
                onClick={() => {
                  dispatch({
                    type: 'CHOOSE_ROOM',
                    payload: {
                      combinedID: companion.combinedID,
                      anotherUser: companion,
                    },
                  });
                  setSideBarOpen(false);
                }}
              >
                <img
                  src={companion.photoURL}
                  alt="avatar"
                  className="UserSidebar__img"
                />
                <div className="UserSidebar__text">
                  <h3 className="UserSidebar__user">
                    {companion.displayName}
                  </h3>
                  {
                    chat?.lastMessage?.message && (
                      <h3 className={classNames('UserSidebar__message', { isOwn: myLastMessage })}>
                        {chat.lastMessage.message}
                      </h3>
                    )
                  }
                </div>
                {
                  chat?.lastMessage?.createdAt?.seconds && (
                    <h3 className={classNames('UserSidebar__time', { isOwn: myLastMessage })}>
                      {timeStamp(chat.lastMessage.createdAt)}
                    </h3>
                  )
                }
              </button>
            );
          })
        ) : (
          <div className="ActiveChats__empty-wrapper">
            <img
              alt="empty"
              src="./assets/desert.svg"
              className="ActiveChats__empty"
            />
            <h1 className="ActiveChats__emptyText">nothing found</h1>
          </div>
        )
      }
    </div>
  );
};
