import React from "react";
import Checkbox from '../Checkbox/Checkbox';
import { NavLink, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import './Register.css';


function Register() {

  // класс применяется для подсвечивания той ссылки, на странице которой находится пользователь
  const activeLink = ({ isActive }) => (isActive) ? 'registration__link_active' : 'registration__link';

  // переменные состояния
  const [nickname, setNickname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [nicknameDirty, setNicknameDirty] = useState(false);
  const [emailDirty, setEmailDirty] = useState(false);
  const [passwordDirty, setPasswordDirty] = useState(false);

  const [nicknameError, setNicknameError] = useState('Поле не может быть пустым');
  const [emailError, setEmailError] = useState('Поле не может быть пустым');
  const [passwordError, setPasswordError] = useState('Поле не может быть пустым');

  const [checkboxError, setCheckboxError] = useState('');
  const [isChecked, setIsChecked] = useState(false);

  const [formValid, setFormValid] = useState(false);

  // функция для валидации инпутов формы
  useEffect(() => {
    if (nicknameError || emailError || passwordError || !isChecked) {
      setFormValid(false)
    } else {
      setFormValid(true)
    }
  }, [nicknameError, emailError, passwordError, isChecked])

  // функция для валидация инпута никнейма с автоматическим добавление @, если пользователь ее не добавил самостоятельно
  const nicknameHandler = (e) => {
    setNickname(e.target.value);
    const inputVal = e.target.value;
    let formattedVal = inputVal;

    // Добавляем @ в начало значения если его не существует
    if (inputVal.length > 0 && inputVal[0] !== "@") {
      formattedVal = `@${inputVal}`;
    }

    // Валидируем значение инпута никнейма
    const re = /^@[a-zA-Z0-9_.-]{3,20}$/;
    if (!re.test(formattedVal)) {
      setNicknameError('Только латиница (a-z), цифры (0-9), символы (_-.@), не меньше 3 и не больше 20 символов');
      if (!inputVal) {
        setNicknameError('Поле не может быть пустым');
      }
    } else {
      setNicknameError('');
      setNickname(formattedVal);
    }
  };

  // функция для валидации инпута email
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

  // функция для валидации инпута пароля
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

    // функция для валидации чекбокса (используем isChecked, чтобы связать с событием  компонента Checkbox)
    const checkboxHandler = (isChecked) => {
      if (!isChecked)  {
        setCheckboxError('');
      } 
      setIsChecked(isChecked);
    };

  // Обработчик события при потере фокуса инпута
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
        default:
          // Ничего не делаем. Добавление default является хорошей практикой.
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

            <form action="/" noValidate>
              <div className="registration__input-container">
                <label className="registration__form-label" htmlFor="nickname">Никнейм</label>
                <input
                  onChange={e => {nicknameHandler(e);}}
                  value={nickname}
                  onBlur={e => blurHandler(e)}
                  className={`registration__input
                  ${nicknameDirty && nicknameError ? 'registration__input_type_error' : ''}
                  ${nicknameError === 'Только латиница (a-z), цифры (0-9), символы (_-.@), не меньше 3 и не больше 20 символов' ? 'registration__input_type_error-big' : ''}`}

                  id="nickname"
                  type="text"
                  name="nickname"
                  placeholder="@" required />
                {(nicknameDirty && nicknameError) && <span
                className={`${nicknameDirty && nicknameError ? 'registration__input-error nickname-error' : ''}
                ${nicknameError === 'Только латиница (a-z), цифры (0-9), символы (_-.@), не меньше 3 и не больше 20 символов' ? 'registration__input-error-big' : ''}`}>{nicknameError}</span>}
              </div>

              <div className="registration__input-container">
                <label className="registration__form-label" htmlFor="email">E-mail</label>
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
                <label className="registration__form-label" htmlFor="password">Пароль</label>
                <input
                  onChange={e => passwordHandler(e)}
                  value={password}
                  onBlur={e => blurHandler(e)}
                  className={`registration__input
                  ${passwordDirty && passwordError ? 'registration__input_type_error' : ''}
                  ${passwordError === 'Длина пароля не может быть меньше 8 и больше 50 символов' ? 'registration__input_type_error-big' : ''}`}
                  placeholder="Не менее 8 символов"
                  id="password"
                  type="password"
                  name="password"
                  required />
                {(passwordDirty && passwordError) && <span className={`${passwordDirty && passwordError ? 'registration__input-error nickname-error' : ''}
                ${passwordError === 'Длина пароля не может быть меньше 8 и больше 50 символов' ? 'registration__input-error-big' : ''}`}>{passwordError}</span>}
              </div>

              <div className="registration__checkbox-form">
                <Checkbox
                onChange={e => checkboxHandler(e)}
                checked={isChecked}
                id="checkbox"
                name="checkbox" />
                <p class="registration__policy-text">Я согласен с <Link class="registration__policy-link" to="">Политикой конфиденциальности</Link> и <Link class="registration__policy-link" to="">Пользовательским соглашением</Link></p>
                {checkboxError && <p>{checkboxError}</p>}
              </div>

              <button
                type="submit"
                className={`registration__submit-button ${formValid && isChecked ? "registration__submit-button_active" : "registration__submit-button_disabled"}`}
                disabled={!formValid || !isChecked}>Зарегистрироваться</button>
            </form>
          </section>
        </div>

      </main>

    </div>
  );
}

export default Register;