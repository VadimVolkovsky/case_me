import React from "react";
import { Link, NavLink} from "react-router-dom";
import "./Login.css";

const setActive = ({ isActive }) => (isActive ? "authorize__title-link_active" : "authorize__title-link");

function Login() {
  return (
    <main className="content">
      <div className="authorize">
        <div className="authorize__title-links">
          <NavLink to="/signin" className={setActive}>Вход</NavLink>
          <NavLink to="/signup" className={setActive}>Регистрация</NavLink>
        </div>
        <form className="form-authorize" novalidate>
          <fieldset className="form-authorize__set">
            <div className="form-authorize__field">
              <label className="form-authorize__input-label" for="email">E-mail</label>
              <input className="form-authorize__input form-authorize__input_type_email" placeholder="Введите e-mail" id="email" type="email" name="email" required />
              <span className="form-authorize__input-error email-error"></span>
            </div>
            <div className="form-authorize__field">
              <label className="form-authorize__input-label" for="password">Пароль</label>
              <input className="form-authorize__input form-authorize__input_type_password" placeholder="Введите пароль" id="password" type="password" name="password" required />
              <span className="form-authorize__input-error password-error"></span>
            </div>
            <button className="form-authorize__enter-btn" type="submit">Войти</button>
          </fieldset>
        </form>
        <Link to="/passwordform" className="authorize__link">Забыли пароль?</Link>
      </div>
    </main>
  );
}

export default Login;