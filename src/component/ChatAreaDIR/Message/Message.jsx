/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable react/prop-types */
import React, { useState, useRef, useEffect } from 'react';
import classNames from 'classnames';
import { useFireStore } from '../../../hooks/useFireStore';
import { useStorage } from '../../../hooks/useStorage';
import './Message.scss';

export const Message = ({
  post,
  myMessage,
  messagePostTime,
  sameUserWithPrevMessage,
  photoURL,
  displayName,
  currentUserID,
  chatRoomID,
  scrollDown,
}) => {
  const [deleteIconVisible, setDeleteIconVisisble] = useState(false);
  const [chosenMessage, setChosenMessage] = useState(null);
  const trashBin = useRef(null);
  const { deleteMessage } = useFireStore();
  const { deleteStorageImage } = useStorage();

  const blurHandle = (e) => {
    if (!trashBin.current.contains(e.target) && !chosenMessage.contains(e.target)) {
      setDeleteIconVisisble(false);
    }
  };
  useEffect(() => {
    if (currentUserID === post.senderId) {
      if (deleteIconVisible) {
        document.addEventListener('mousedown', blurHandle);
      } else {
        document.removeEventListener('mousedown', blurHandle);
      }
    }

    return () => document.removeEventListener('mousedown', blurHandle);
  }, [deleteIconVisible]);

  const deleteHandle = () => {
    if (post.containsImage) {
      deleteStorageImage(post.imageStorageName);
    }
    deleteMessage(chatRoomID, post);
    document.removeEventListener('mousedown', blurHandle);
  };

  return (
    <div
      className={classNames('Message', { isOwn: myMessage }, { margin: !sameUserWithPrevMessage })}
    >
      <img
        src={photoURL}
        alt="avatar"
        className={classNames('Message__avatar', { hidden: sameUserWithPrevMessage })}
      />

      <div className="Message__unit">
        <div
          className={classNames('Message__person-wrapper', { isOwn: myMessage })}
        >
          {
            !sameUserWithPrevMessage && (
              <>
                {
                  messagePostTime && messagePostTime.length > 1 && (
                    <h3 className="Message__person">{messagePostTime[1]}</h3>
                  )
                }
                <h3 className="Message__person">{displayName}</h3>
              </>
            )
          }
        </div>
        <div
          className={classNames(
            'Message__content',
            { isOwn: myMessage },
            { containsImage: post.containsImage },
          )}
          onClick={(e) => {
            setDeleteIconVisisble((prev) => {
              if (!prev) {
                setChosenMessage(e.target);
              }
              return !prev;
            });
          }}
        >
          {
            !post.containsImage ? (
              <p className={classNames('Message__text', { isOwn: myMessage })}>
                {post.text}
              </p>
            ) : (
              <img
                onLoad={() => { scrollDown(); }}
                src={post.imageURL}
                alt="users pics"
                className="Message__image"
              />
            )
          }
          <div className="Message__time-container">
            <h3 className={classNames('Message__timeStamp', { containsImage: post.containsImage })}>
              {messagePostTime[0]}
            </h3>
          </div>
        </div>
      </div>
      {
        (deleteIconVisible && currentUserID === post.senderId) && (
          <div className="Message__delete-container">
            <button
              ref={trashBin}
              type="button"
              className="Message__delete"
              onClick={() => {
                deleteHandle();
              }}
            >
              <img
                className="Message__deleteImg"
                src="./assets/delete.svg"
                alt="delete"
              />
            </button>
          </div>
        )
      }
    </div>
  );
};
