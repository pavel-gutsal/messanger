import React, { useContext, useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { AuthContext } from './context/AuthContext';
import { SignIn } from './pages/SignIn/SignIn';
import { Home } from './pages/Home/Home';
import { NavBar } from './pages/NavBar/NavBar';

export const App = () => {
  const { currentUser } = useContext(AuthContext);
  const { user, authIsReady } = currentUser;
  const [sideBarOpen, setSideBarOpen] = useState(false);
  /*eslint-disable*/
  return (
    <div className="App">
      {
        authIsReady && (
          <Routes>
            <Route
              path="/"
              element={
                <NavBar setSideBarOpen={setSideBarOpen} />
              }
            >
              { user && (
                <Route index element={
                  <Home setSideBarOpen={setSideBarOpen} sideBarOpen={sideBarOpen}/>
                  } /> ) }
              { !user && <Route index element={<Navigate to="/signIn" replace />} /> }
              <Route path="/signIn" element={!user ? (<SignIn />) : (<Navigate to="/" replace />)} />
              <Route path="/home" element={!user ? (<SignIn />) : (<Navigate to="/" replace />)} />
            </Route>
          </Routes>
        )
      }
    </div>
  );
};
