import React from "react";
import PasswordTooltip from "../PasswordTooltip/PasswordTooltip";

function PasswordRecovery() {
  return (
    <PasswordTooltip
    name="recovery"
    title="Восстановление пароля"
    text="Мы отправили на вашу почту подтвержение для
    смены пароля. Перейдите по ссылке из&nbsp;письма, чтобы создать новый пароль."
    link="/"
    textLink="Ок"
    />
  );
}

export default PasswordRecovery;