import React from "react";
import "./InfoRecoveryPassword.css";

function InfoRecoveryPassword() {
  return (
    <div className="recoveryPassword">
      <div className="recoveryPassword__content">
        <h2 className="recoveryPassword__title">Восстановление пароля</h2>
        <p className="recoveryPassword__text">Мы отправили на вашу почту подтвержение для
         смены пароля. Перейдите по ссылке из&nbsp;письма, чтобы создать новый пароль.</p>
      </div>
    </div>
  );
}

export default InfoRecoveryPassword;