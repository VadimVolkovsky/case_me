import React, { useEffect, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import ErrorNotification from "../ErrorNotification/ErrorNotification";
import "./Login.css";


function Login({ onLogin }) {

  const setActive = ({ isActive }) => (isActive ? "authorize__title-link_active" : "authorize__title-link");

  /**переменные состояния для валидации*/
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailDirty, setEmailDirty] = useState(false);
  const [passwordDirty, setPasswordDirty] = useState(false);
  const [emailError, setEmailError] = useState("Поле не может быть пустым");
  const [passwordError, setPasswordError] = useState("Поле не может быть пустым");
  const [formValid, setFormValid] = useState(false);
  const [emailFocused, setEmailFocused] = useState(false);
  const [passwordFocused, setPasswordFocused] = useState(false);
  // Переменные валидности полей при заполнении
  const [emailValid, setEmailValid] = useState(false);
  const [passwordValid, setPasswordValid] = useState(false);

  // переменные для вывода серверной ошибки
  const [showError, setShowError] = useState(false);

  /**изменить состояние кнопки*/
  useEffect( () => {
    if(emailError || passwordError) {
      setFormValid(false)
    } else {
      setFormValid(true)
    }
  }, [emailError, passwordError])

  /**изменить состояние инпутов, когда пользователь что-то вводит */
  function handleChangeEmail(e){
    const {name, value} = e.target;
    setState({
    ...state,
    [name]: value
  });
    setEmail(e.target.value)
    const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if(e.target.value.length === 0) {
      setEmailError("Поле не может быть пустым");
      setEmailValid(false);
    } else if (!re.test(String(e.target.value).toLocaleLowerCase())) {
      setEmailError("Некорректный email");
      setEmailValid(false);
    }
      else {
        setEmailError("");
        setEmailValid(true);
      }
  }
  function handleChangePassword(e) {
    setPassword(e.target.value);
    const {name, value} = e.target;
    setState({
    ...state,
    [name]: value
  });
    if (!e.target.value) {
      setPasswordError("Поле не может быть пустым");
      setPasswordValid(false);
    } else if (e.target.value.length < 8 || e.target.value.length > 50) {
      setPasswordError("Длина пароля не может быть меньше 8 и больше 50 символов");
      setPasswordValid(false);
    } else {
      setPasswordError("");
      setPasswordValid(true);
    }
  }

  /**срабатывает, когда пользователь покинул поле ввода*/
  const blurHandler = (e) => {
    switch(e.target.name) {
      case "email":
        setEmailDirty(true);
        setEmailFocused(false);
        break
      case "password":
        setPasswordDirty(true);
        setPasswordFocused(false);
        break
    }
  }
/**авторизация*/

const [state, setState] = useState({
  email:'',
  password:''
})

function handleSubmit(e) {
  e.preventDefault();
  const { email, password } = state;
  if(!email || !password) return;

  onLogin(email, password)
  .catch(err => {
    console.log(err);
    setState({
      ...state,
    });
    setShowError(true);
  });
}

  return (
    <main className="content-auth">
      <div className="authorize">
      {showError && (<ErrorNotification onClose={() => setShowError(false)} />)}
        <div className="authorize__title-links">
          <NavLink to="/signin" className={setActive}>Вход</NavLink>
          <NavLink to="/signup" className={setActive}>Регистрация</NavLink>
        </div>
        <form className="form-authorize" onSubmit={handleSubmit} novalidate>
          <fieldset className="form-authorize__set">
            <div className="form-authorize__field">
              <label className="form-authorize__input-label" for="email">E-mail</label>
              <input
                type="email"
                name="email"
                id="email"
                placeholder="Введите e-mail"
                className={`form-authorize__input ${emailDirty && emailError ? "form-authorize__input_type_error" : ""}`}
                value={state.email}
                onChange={handleChangeEmail}
                onBlur={e => blurHandler(e)}
                onFocus={() => setEmailFocused(true)}
                required
              />
              {(emailDirty && emailError && !emailFocused) && <span className="form-authorize__input-error email-error">{emailError}</span>}
            </div>
            <div className="form-authorize__field">
              <label className="form-authorize__input-label" for="password">Пароль</label>
              <input
                type="password"
                name="password"
                id="password"
                placeholder="Введите пароль"
                className={`form-authorize__input ${passwordDirty && passwordError ? "form-authorize__input_type_error" : ""}`}
                value={state.password}
                onChange={handleChangePassword}
                onBlur={e => blurHandler(e)}
                onFocus={() => setPasswordFocused(true)}
                required
              />
              {(passwordDirty && passwordError && !passwordFocused) && <span className="form-authorize__input-error password-error">{passwordError}</span>}
            </div>
            <button
              type="submit"
              className={`form-authorize__enter-btn ${formValid ? "form-authorize__enter-btn_active" : "form-authorize__enter-btn_disabled"}`}
              disabled={!formValid}>
              Войти
            </button>
          </fieldset>
        </form>
        <Link to="/emailform" className="authorize__link">Забыли пароль?</Link>
      </div>
    </main>
  );
}

export default Login;