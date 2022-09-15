/* eslint-disable react/prop-types */
import React, { useEffect, useRef } from 'react';
import { Message } from '../Message/Message';
import { timeStamp } from '../../../functions/timestamp';
import './Messages.scss';

export const Messages = ({ chatRoom, currentUser }) => {
  const { chatRoomContent, anotherPerson, chatRoomID } = chatRoom;
  const scroll = useRef(null);

  const scrollDown = () => {
    scroll.current.scrollIntoView({ behavior: 'smooth', block: 'end' });
  };
  /*eslint-disable*/
  useEffect(() => {
    scrollDown();
  }, [chatRoom]);
  return (
    <div className="Messages">
      <div className="Messages__wrap">
        {
          chatRoomContent && chatRoomContent?.length > 0 && (
            chatRoomContent.map((post, index) => {
              let sameUserWithPrevMessage = false;

              const messagePostTime = timeStamp(post.date);
              if (index > 0) {
                if (
                  chatRoomContent[index - 1].senderId === post.senderId
                  && post.date.seconds - chatRoomContent[index - 1].date.seconds < 300
                ) {
                  sameUserWithPrevMessage = true;
                }
              }
              const myMessage = currentUser.uid === post.senderId;
              const photoURL = myMessage ? currentUser.photoURL : anotherPerson.photoURL;
              const displayName = myMessage ? currentUser.displayName : anotherPerson.displayName;

              return (
                <Message
                  key={post.id}
                  post={post}
                  myMessage={myMessage}
                  messagePostTime={messagePostTime}
                  sameUserWithPrevMessage={sameUserWithPrevMessage}
                  photoURL={photoURL}
                  displayName={displayName}
                  currentUserID={currentUser.uid}
                  chatRoomID={chatRoomID}
                  scrollDown={scrollDown}
                />
              );
            })
          )
        }
        <div ref={scroll} className="scroll" />
      </div>
    </div>
  );
};
