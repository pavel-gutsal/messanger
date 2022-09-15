/* eslint-disable react/prop-types */
import React, { useState, useEffect, useRef } from 'react';
import classNames from 'classnames';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import { useFireStore } from '../../../hooks/useFireStore';
import { useStorage } from '../../../hooks/useStorage';
import './ChatForm.scss';

export const ChatForm = ({ currentUserID, chatRoomID }) => {
  const [input, setInput] = useState('');
  const [scrollHeight, setScrollHeight] = useState(false);
  const [file, setFile] = useState(null);
  const divContentEdible = useRef(null);
  const { addMessage } = useFireStore();
  const {
    uploadImage,
    progress,
    imageUrl,
    imageStorageName,
  } = useStorage();

  useEffect(() => {
    divContentEdible.current.innerText = '';
  }, [chatRoomID]);

  useEffect(() => {
    if (file) {
      uploadImage(file);
    }
  }, [file]);

  useEffect(() => {
    if (file && progress === 100) {
      setFile(null);
    }
  }, [progress]);

  useEffect(() => {
    if (imageUrl) {
      addMessage(chatRoomID, {
        containsImage: true,
        imageStorageName,
        imageURL: imageUrl,
        text: null,
        senderId: currentUserID,
      });
    }
  }, [imageUrl]);

  const submitHandler = async () => {
    if (input === '') {
      return;
    }

    const str = input.replace(/\s+/g, ' ').trim();

    if (str === '') {
      return;
    }

    addMessage(chatRoomID, {
      containsImage: false,
      text: str,
      senderId: currentUserID,
    });

    divContentEdible.current.innerText = '';
    setInput('');
    setScrollHeight(false);
  };

  return (
    <div className="ChatForm">
      <form
        className={classNames('ChatForm__form', { roundBorder: scrollHeight })}
        onSubmit={(e) => {
          e.preventDefault();
          submitHandler();
        }}
      >
        { file && (
          <div style={{ width: 50, height: 50 }} className="ChatForm__ProgressBar">
            <CircularProgressbar
              value={progress}
              maxValue={100}
              strokeWidth={14}
              styles={buildStyles({
                pathColor: 'rgb(252, 220, 126)',
                strokeLinecap: 'butt',
              })}
            />
          </div>
        )}
        {
          !file && (
            <label
              className="ChatForm__label"
              htmlFor="chat-add-image"
            >
              <img
                className="ChatForm__addImg"
                src="./assets/add.svg"
                alt="add"
              />
              <input
                id="chat-add-image"
                type="file"
                className="ChatForm__file"
                onChange={(e) => {
                  setFile(e.target.files[0]);
                }}
              />
            </label>
          )
        }
        <div
          ref={divContentEdible}
          className="ChatForm__textdiv"
          contentEditable
          data-placeholder="Type a message..."
          onInput={(e) => {
            setInput(e.target.innerText);
            if (e.target.scrollHeight > 60) {
              setScrollHeight(true);
              return;
            }
            setScrollHeight(false);
          }}
          value={input}
        />
        <button
          type="submit"
          className={classNames('ChatForm__send', { round: scrollHeight })}
        >
          <img
            className={classNames('ChatForm__sendImg', { roundImg: scrollHeight })}
            src="./assets/send.svg"
            alt="send"
          />
        </button>
      </form>
    </div>
  );
};
