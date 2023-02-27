import React from "react";
import logo from "../../img/logo_case_me.svg";
import "./Header.css";
import { Link, useLocation } from "react-router-dom";
import Navigation from "../Navigation/Navigation.js";

function Header({ loggedIn }) {
  const location = useLocation();
  const headerClass = (
    location.pathname === '/signin'
    || location.pathname === '/signup'
    || location.pathname === '/emailform'
    || location.pathname === '/passwordform'
    || location.pathname === '/passwordupdate'
    || location.pathname === '/passwordrecovery')  ? 'header' : 'header header_nav';

  return (
    <header className={headerClass}>
      <Link to="/main" className="header__link">
        <img className="header__logo" src={logo} alt="Логотип"/>
      </Link>
      <Navigation loggedIn={loggedIn} />
    </header>
  )
}

export default Header;