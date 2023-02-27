import React from "react";
import logo from "../../img/logo_case_me.svg";
import "./Header.css";
import { Link, useLocation } from "react-router-dom";
import Navigation from "../Navigation/Navigation.js";

function Header({ loggedIn }) {
  const location = useLocation();
  const headerClass = (location.pathname === '/main'|| location.pathname === '/privacypolicy' || location.pathname === '/useragreement') ? 'header header_nav' : 'header';

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