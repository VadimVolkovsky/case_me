import React from "react";
import { Link, useLocation} from "react-router-dom";
import "./Login.css";

function Login() {
  return (
    <main className="content">
    <div className="authorize">
      <div className="authorize__title-links">
        <Link className="authorize__title-link">Вход</Link>
        <Link className="authorize__title-link">Регистрация</Link>
      </div>
      <form className="form-authorize" novalidate>
        <fieldset className="form-authorize__set">
          <div className="form-authorize__field">
            <label className="form-authorize__input-label" for="email">E-mail</label>
            <input className="form-authorize__input form-authorize__input_type_email" placeholder="Введите e-mail" id="email" type="email" name="email" required/>
            <span className="form-authorize__input-error email-error"></span>
          </div>
          <div className="form-authorize__field">
            <label className="form-authorize__input-label" for="password">Пароль</label>
            <input className="form-authorize__input form-authorize__input_type_password" placeholder="Введите пароль" id="password" type="password" name="password" required/>
            <span className="form-authorize__input-error password-error"></span>
          </div>
          <button className="form-authorize__enter-btn" type="submit">Войти</button>
        </fieldset>
      </form>
      <Link className="authorize__link">Забыли пароль?</Link>
    </div>

  </main>
  );
}

export default Login;