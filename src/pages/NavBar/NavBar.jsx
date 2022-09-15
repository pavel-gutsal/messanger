/* eslint-disable react/prop-types */
import React from 'react';
import classNames from 'classnames';
import { Outlet, useLocation } from 'react-router-dom';
import './NavBar.scss';

export const NavBar = ({ setSideBarOpen }) => {
  const location = useLocation();

  return (
    <>
      <div className={classNames('NavBar', { hide: location.pathname === '/signIn' })}>
        <button
          type="button"
          className="NavBar__btn"
          onClick={() => {
            setSideBarOpen((prev) => !prev);
          }}
        >
          <img
            src="./assets/dots.svg"
            alt="dots"
          />
        </button>
      </div>
      <Outlet />
    </>
  );
};
