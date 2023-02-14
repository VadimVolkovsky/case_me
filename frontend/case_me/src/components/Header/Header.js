import React from "react";
import "./Header.css";
import logo from "../../img/logo_case_me.svg";

function Header() {
  return (
    <header class="header">
      <img class="header__logo" src={logo} alt="Логотип"/>
    </header>
  )
}

export default Header;