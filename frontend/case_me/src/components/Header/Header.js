import React from "react";
import logo from "../../img/logo_case_me.svg";
import "./Header.css";
import { Link, useLocation } from "react-router-dom";
import Navigation from "../Navigation/Navigation.js";

function Header({ loggedIn }) {
  return (
    <header className="header">
      <Link to="/main" className="header__link">
        <img className="header__logo" src={logo} alt="Логотип"/>
      </Link>
      <Navigation loggedIn={loggedIn} />
    </header>
  )
}

export default Header;