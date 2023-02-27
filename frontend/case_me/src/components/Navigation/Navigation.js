import React, { useState } from "react";
import './Navigation.css';
import '../Header/Header.css';
import { Link, useLocation } from "react-router-dom";

function Navigation ({ loggedIn }) {
  const location = useLocation();
  const enterButtons = (location.pathname === '/main') ? "navigation__enter-btn" : "";

  return (
    <nav className="navigation">
      <button className="{`navigation__enter-btn ${enterButtons}`}" type="button">Войти</button>
    </nav>
  )
}

export default Navigation