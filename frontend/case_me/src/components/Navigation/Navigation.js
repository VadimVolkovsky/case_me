import React, { useState } from "react";
import './Navigation.css';
import '../Header/Header.css';
import { Link, useLocation } from "react-router-dom";

function Navigation ({ loggedIn }) {
  const location = useLocation();
  const navigationClass = (`navigation ${loggedIn ? '' : 'navigation_logout'}`);
  const enterButton = (location.pathname === '/main' || location.pathname === '/privacypolicy' || location.pathname === '/useragreement') ? "navigation__enter-btn_active" : "";

  return (
    <nav className={navigationClass}>

      {!loggedIn && <div className="navigation__logout">
        <button className={`navigation__enter-btn ${enterButton}`} type="button">Войти</button>
      </div>}


    </nav>
  )
}

export default Navigation