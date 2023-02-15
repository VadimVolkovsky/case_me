import React from "react";
import Checkbox from '../Checkbox/Checkbox';
import { NavLink, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import './Register.css';


function Register() {

  const activeLink = ({ isActive }) => (isActive) ? 'registration__link_active' : 'registration__link';

  const [nickname, setNickname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [nicknameDirty, setNicknameDirty] = useState(false);
  const [emailDirty, setEmailDirty] = useState(false);
  const [passwordDirty, setPasswordDirty] = useState(false);

  const [nicknameError, setNicknameError] = useState('Поле не может быть пустым');
  const [emailError, setEmailError] = useState('Поле не может быть пустым');
  const [passwordError, setPasswordError] = useState('Поле не может быть пустым');

  const [formValid, setFormValid] = useState(false);

  useEffect(() => {
    if (nicknameError || emailError || passwordError) {
      setFormValid(false)
    } else {
      setFormValid(true)
    }
  }, [nicknameError, emailError, passwordError])

  const nicknameHandler = (e) => {
    setNickname(e.target.value);
    const re = /^@[a-zA-Z0-9_.-]{2,19}$/;
    if (!re.test(`@${e.target.value}`)) {
      setNicknameError('Только латиница (a-z), цифры (0-9), символы (_-.@), не меньше 3 и не больше 20 символов');
      if (!e.target.value) {
        setNicknameError('Поле не может быть пустым');
      }
    } else {
      setNicknameError('');
      setNickname(`@${e.target.value}`);
    }
  }


  const emailHandler = (e) => {
    setEmail(e.target.value);
    const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!re.test(String(e.target.value).toLowerCase())) {
      setEmailError('Введите корректный e-mail');
      if (!e.target.value) {
        setEmailError('Поле не может быть пустым');
      }
    } else {
      setEmailError('');
    }
  }


  const passwordHandler = (e) => {
    setPassword(e.target.value);
    if (e.target.value.length < 8 || e.target.value.length > 50) {
      setPasswordError('Длина пароля не может быть меньше 8 и больше 50 символов');
      if (!e.target.value) {
        setPasswordError('Поле не может быть пустым');
      }
    } else {
      setPasswordError('');
    }
  }

  const blurHandler = (e) => {
    switch (e.target.name) {
      case 'nickname':
        setNicknameDirty(true);
        break;
      case 'email':
        setEmailDirty(true);
        break;
      case 'password':
        setPasswordDirty(true);
        break;
    }
  }

  return (
    <div>
      <main className="content">
        <div className="registration">
          <section className="registration__info">
            <nav>
              <ul className="registration__links">
                <NavLink to="/signin" className={activeLink}>Вход</NavLink>
                <NavLink to="/signup" className={activeLink}>Регистрация</NavLink>
              </ul>
            </nav>

            <form action="/" novalidate>
              <div className="registration__input-container">
                <label className="registration__form-label" for="nickname">Никнейм</label>

                <input
                  onChange={e => {nicknameHandler(e);}}
                  value={nickname}
                  onBlur={e => blurHandler(e)}
                  className={`registration__input ${nicknameDirty && nicknameError ? 'registration__input_type_error' : ''}`}
                  id="nickname"
                  type="text"
                  name="nickname"
                  placeholder="@" required />
                {(nicknameDirty && nicknameError) && <span className="registration__input-error nickname-error">{nicknameError}</span>}
              </div>

              <div className="registration__input-container">
                <label className="registration__form-label" for="email">E-mail</label>
                <input
                  onChange={e => emailHandler(e)}
                  value={email}
                  onBlur={e => blurHandler(e)}
                  className={`registration__input ${emailDirty && emailError ? 'registration__input_type_error' : ''}`}
                  id="email"
                  type="email"
                  name="email"
                  required />
                {(emailDirty && emailError) && <span className="registration__input-error email-error">{emailError}</span>}
              </div>

              <div className="registration__input-container">
                <label className="registration__form-label" for="password">Пароль</label>
                <input
                  onChange={e => passwordHandler(e)}
                  value={password}
                  onBlur={e => blurHandler(e)}
                  className={`registration__input ${passwordDirty && passwordError ? 'registration__input_type_error' : ''}`}
                  placeholder="Не менее 8 символов"
                  id="password"
                  type="password"
                  name="password"
                  required />
                {(passwordDirty && passwordError) && <span className="registration__input-error password-error">{passwordError}</span>}
              </div>

              <div className="registration__checkbox-form">
                <Checkbox id="checkbox" name="checkbox" required={true} />
                <p class="registration__policy-text">Я согласен с <Link class="registration__policy-link" to="">Политикой конфиденциальности</Link> и <Link class="registration__policy-link" to="">Пользовательским соглашением</Link></p>
              </div>

              <button
                type="submit"
                className={`registration__submit-button ${formValid ? "registration__submit-button_active" : "form-authorize__enter-btn_disabled"}`}
                disabled={!formValid}>Зарегистрироваться</button>
            </form>
          </section>
        </div>

      </main>

    </div>
  );
}

export default Register;