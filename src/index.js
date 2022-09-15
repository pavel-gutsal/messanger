import React from 'react';
import ReactDOM from 'react-dom/client';
import { HashRouter } from 'react-router-dom';
import { App } from './App';
import { AuthContextProvider } from './context/AuthContext';
import { ChatRoomContextProvider } from './context/ChatRoomContext';
import './index.scss';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <AuthContextProvider>
    <ChatRoomContextProvider>
      <HashRouter>
        <App />
      </HashRouter>
    </ChatRoomContextProvider>
  </AuthContextProvider>,
);
