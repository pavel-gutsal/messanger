/* eslint-disable react/prop-types */
import React from 'react';
import { UserSidebar } from '../UserSidebar/UserSidebar';
import './UserListSidebar.scss';

export const UserListSidebar = ({
  userList, currentUser, setSideBarOpen,
}) => {
  return (
    <div className="UserList">
      {
        userList && userList.length > 0 && (
          userList
            .filter((el) => {
              return el.uid !== currentUser.uid;
            })
            .map((element) => {
              return (
                <UserSidebar
                  userSidebarInfo={element}
                  key={element.uid}
                  currentUser={currentUser}
                  setSideBarOpen={setSideBarOpen}
                />
              );
            })
        )
      }
    </div>
  );
};
