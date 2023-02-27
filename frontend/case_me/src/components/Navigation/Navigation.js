import React, { useState } from "react";
import './Navigation.css';
import '../Header/Header.css';
import avatar from '../../img/Avatar.svg'
import { Link, useLocation } from "react-router-dom";

function Navigation ({ loggedIn }) {
  const location = useLocation();
  const navigationClass = (`navigation ${loggedIn ? 'navigation_logged' : ''}`);
  const navigationStatus = (
    location.pathname === '/signin'
    || location.pathname === '/signup'
    || location.pathname === '/emailform'
    || location.pathname === '/passwordform'
    || location.pathname === '/passwordupdate'
    || location.pathname === '/passwordrecovery') ? 'navigation_block' : 'navigation';

  return (
    <nav className={navigationClass}>
      {!loggedIn && <div className={navigationStatus}>
        <Link to="/signin" className='navigation__enter-link'>Войти</Link>
      </div>}
      {loggedIn && <div className={`navigation__account-logged ${navigationStatus}`}>
        <button className="navigation__btn navigation__btn_add" type="button"></button>
        <button className="navigation__btn navigation__btn_setting" type="button"></button>
        <img className="navigation__userAvatar" src={avatar} alt="Аватар пользователя"></img>
        <Link to="#" className="navigation__userName">User name</Link>
      </div>}
    </nav>
  )
}

export default Navigation