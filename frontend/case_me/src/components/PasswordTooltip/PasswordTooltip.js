import React from "react";
import { Link } from "react-router-dom";
import "./PasswordTooltip.css";

function PasswordTooltip(props) {

  const{name, title, text, link, textLink} = props

  return (
    <div className={`passwordTooltip passwordTooltip_type_${name}`}>
      <div className="passwordTooltip__content">
        <h2 className="passwordTooltip__title">{title}</h2>
        <p className="passwordTooltip__text">{text}</p>
        <Link to={`${link}`} className="passwordTooltip__link">{textLink}</Link>
      </div>
    </div>
  );
}

export default PasswordTooltip;