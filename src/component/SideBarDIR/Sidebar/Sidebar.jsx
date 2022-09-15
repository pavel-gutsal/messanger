/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import classNames from 'classnames';
import { ReactComponent as CatalogSVG } from '../../../svgs/catalog.svg';
import { ReactComponent as ChatsSVG } from '../../../svgs/chats.svg';
import { ReactComponent as ProfileSVG } from '../../../svgs/profile.svg';
import { UserListSidebar } from '../UserListSidebar/UserListSidebar';
import { Profile } from '../Profile/Profile';
import { ActiveChats } from '../ActiveChats/ActiveChats';
import './Sidebar.scss';

export const Sidebar = ({
  userList,
  currentUser,
  userChatList,
  sideBarOpen,
  setSideBarOpen,
}) => {
  const [optionSelected, setOptionSelected] = useState('FRIENDS_LIST');
  return (
    <>
      <div
        className={classNames('Sidebar__bgBlur', { sideBarOpen })}
        onClick={() => {
          setSideBarOpen((prev) => !prev);
        }}
      />
      <div
        className={classNames('Sidebar', { sideBarOpen })}
      >
        <div className="Sidebar__background" />
        <div className="Sidebar__background-Top">
          <h1 className="Sidebar__logo">Messanger</h1>
        </div>
        <div className="Sidebar__menu">
          <button
            type="button"
            className={
              classNames('Sidebar__OptionBtn', { Sidebar__optionSelected: optionSelected === 'FRIENDS_LIST' })
            }
            onClick={() => {
              setOptionSelected('FRIENDS_LIST');
            }}
          >
            <div className="Sidebar__OptionBtn-wrapper">
              <CatalogSVG className="Sidebar__svg" />
              Friends List
            </div>
          </button>
          <button
            type="button"
            className={
              classNames('Sidebar__OptionBtn', { Sidebar__optionSelected: optionSelected === 'INPUT_LIST' })
            }
            onClick={() => {
              setOptionSelected('INPUT_LIST');
            }}
          >
            <div className="Sidebar__OptionBtn-wrapper">
              <ChatsSVG className="Sidebar__svg" />
              Inbox List
            </div>
          </button>
          <button
            type="button"
            className={
              classNames('Sidebar__OptionBtn', { Sidebar__optionSelected: optionSelected === 'PROFILE' })
            }
            onClick={() => {
              setOptionSelected('PROFILE');
            }}
          >
            <div className="Sidebar__OptionBtn-wrapper">
              <ProfileSVG className="Sidebar__svg" />
              Profile
            </div>
          </button>
        </div>
        <div className="Sidebar__content">
          {
            optionSelected === 'FRIENDS_LIST' && (
              <UserListSidebar
                userList={userList}
                currentUser={currentUser.user}
                setSideBarOpen={setSideBarOpen}
              />
            )
          }
          {
            optionSelected === 'INPUT_LIST' && (
              <ActiveChats
                currentUser={currentUser.user}
                userChatList={userChatList}
                setSideBarOpen={setSideBarOpen}
              />
            )
          }
          {
            optionSelected === 'PROFILE' && (
              <Profile currentUser={currentUser.user} />
            )
          }
        </div>
      </div>
    </>
  );
};
