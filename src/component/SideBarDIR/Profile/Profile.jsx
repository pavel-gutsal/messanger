/* eslint-disable react/prop-types */
import React from 'react';
import { useLogOut } from '../../../hooks/useLogout';
import './Profile.scss';

export const Profile = ({ currentUser }) => {
  const { logOut } = useLogOut();
  return (
    <div className="Profile">
      <div className="Profile__wrapper">
        <div className="Profile__background" />
        <img
          className="Profile__pic"
          src={currentUser.photoURL}
          alt="avatar"
        />
        <h2 className="Profile__name">
          {currentUser.displayName}
        </h2>
        <h2 className="Profile__email">
          {currentUser.email}
        </h2>
        {
          currentUser.metadata.createdAt && (
          <div className="Profile__created-wrapper">
            <h2 className="Profile__created">
              Account was created on:
            </h2>
            <h2 className="Profile__created">
              {new Date(Number(currentUser.metadata.createdAt)).toLocaleString('sv')}
            </h2>
          </div>
          )
        }
        <button
          type="button"
          className="Profile__LogOut"
          onClick={() => {
            logOut();
          }}
        >
          Log Out
        </button>
      </div>
    </div>
  );
};
