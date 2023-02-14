import React, { useEffect, useState } from "react";
import { Link, NavLink} from "react-router-dom";
import "./Login.css";

const setActive = ({ isActive }) => (isActive ? "authorize__title-link_active" : "authorize__title-link");

function Login() {

  /**переменные состояния*/
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailDrty, setEmailDirty] = useState(false);
  const [passwordDirty, setPasswordDirty] = useState(false);
  const [emailError, setEmailError] = useState("Поле не может быть пустым");
  const [passwordError, setPasswordError] = useState("Поле не может быть пустым");

  const blurHandler = (e) => {
    switch(e.target.name) {
      case "email":
        setEmailDirty(true)
        break
      case "password":
        setPasswordDirty(true)
        break
    }
  }

  const emailHandler = (e) => {
    setEmail(e.target.value)
    const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if(!re.test(String(e.target.value).toLowerCase())) {
      setEmailError("Введите корректный e-mail")
      if(!e.target.value) {
        setEmailError("Поле не может быть пустым")
      }
    } else {
      setEmailError("")
    }
  }

  const passwordHandler = (e) => {
    setPassword(e.target.value)
    if(e.target.value.length < 8 || e.target.value.length > 50) {
      setPasswordError("Длина пароля не может быть меньше 8 и больше 50 символов")
      if(!e.target.value) {
        setPasswordError("Поле не может быть пустым")
      }
    } else {
      setPasswordError("")
    }
  }


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
              <input value={email} onBlur={e => blurHandler(e)} onChange={e => emailHandler(e)} className="form-authorize__input form-authorize__input_type_email" placeholder="Введите e-mail" id="email" type="email" name="email" required />
              {(emailDrty && emailError) && <span className="form-authorize__input-error email-error">{emailError}</span>}
            </div>
            <div className="form-authorize__field">
              <label className="form-authorize__input-label" for="password">Пароль</label>
              <input value={password} onBlur={e => blurHandler(e)} onChange={e => passwordHandler(e)} className="form-authorize__input form-authorize__input_type_password" placeholder="Введите пароль" id="password" type="password" name="password" required />
              {(passwordDirty && passwordError) && <span className="form-authorize__input-error password-error">{passwordError}</span>}
            </div>
            <button type="submit" className="form-authorize__enter-btn">Войти</button>
          </fieldset>
        </form>
        <Link to="/passwordform" className="authorize__link">Забыли пароль?</Link>
      </div>
    </main>
  );
}

export default Login;