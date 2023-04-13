import React from "react";
import alert from "../../img/alert-octagon.svg";
import "./ErrorNotification.css";

function ErrorNotification() {

  // Захардкоженные ошибки пока нет API ответов
 const message500 = 'Отправка данных на сервер не удалась, пожалуйста, попробуйте позже'
 const message409 = 'Неверный пароль'


  return (
    <div className="notification">
      <img className="notification__image" src={alert} alt="Ошибка сервера" />
      <p className="notification__text">{message500}</p>
      {/* <p className="">{err.message}</p> */}
    </div>
  );
}

export default ErrorNotification;
