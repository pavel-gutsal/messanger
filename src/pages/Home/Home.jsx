/*eslint-disable*/
import React, { useContext, useEffect } from 'react';
import { ChatArea } from '../../component/ChatAreaDIR/ChatArea/ChatArea';
import { Sidebar } from '../../component/SideBarDIR/Sidebar/Sidebar';
import { useUserCollection } from '../../hooks/useUserCollection';
import { AuthContext } from '../../context/AuthContext';
import './Home.scss';

export const Home = ({ setSideBarOpen, sideBarOpen }) => {
  const { currentUser } = useContext(AuthContext);
  const { userList, userChatList } = useUserCollection(currentUser);

  return (
    <div className="Home">
      <Sidebar
        setSideBarOpen={setSideBarOpen}
        sideBarOpen={sideBarOpen}
        userList={userList}
        currentUser={currentUser}
        userChatList={userChatList}
      />
      <ChatArea />
    </div>
  );
};
