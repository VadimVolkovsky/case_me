import React from "react";
import PasswordTooltip from "../PasswordTooltip/PasswordTooltip";

function PasswordUpdate() {
  return (
    <PasswordTooltip
      name="update"
      title="Изменение пароля"
      text="Пароль успешно обновлен!"
      link="/signin"
      textLink="На страницу входа"
    />
  );
}

export default PasswordUpdate;
