import React from "react";
import { Link } from "react-router-dom";
import "./InfoNewPassword.css";

function InfoNewPassword() {
  return (
    <div className="newPassword">
      <div className="newPassword__content">
        <h2 className="newPassword__title">Изменение пароля</h2>
        <p className="newPassword__text">Пароль успешно обновлен!</p>
        <Link to="/" className="newPassword__link">На страницу входа</Link>
      </div>
    </div>
  );
}

export default InfoNewPassword;
