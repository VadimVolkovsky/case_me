import React from "react";
import { Link } from "react-router-dom";
import "./Header.css";
import logo from "../../img/logo_case_me.svg";

function Header() {
  return (
    <header className="header">
      <Link to="/main" className="header__link">
        <img className="header__logo" src={logo} alt="Логотип"/>
      </Link>
    </header>
  )
}

export default Header;