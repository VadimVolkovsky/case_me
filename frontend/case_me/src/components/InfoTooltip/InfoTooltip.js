import React from "react";
import { Link } from "react-router-dom";
import "./InfoTooltip.css";

function InfoTooltip() {
  return (
    <div className="popup">
      <div className="popup__content">
        <button type="button" className="popup__button-close"></button>
        <h2 className="popup__title">Вы успешно <br/>зарегистрированы!</h2>
        <Link to="/" className="popup__link">Перейти в личный кабинет</Link>
      </div>
    </div>
  );
}

export default InfoTooltip;