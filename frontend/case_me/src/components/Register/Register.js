import React from "react";
import Checkbox from '../Checkbox/Checkbox';
import PopupTooltip from "../PopupTooltip/PopupTooltip";
import ErrorNotification from "../ErrorNotification/ErrorNotification";
import { NavLink, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import './Register.css';

function Register() {

  // класс применяется для подсвечивания той ссылки, на странице которой находится пользователь
  const activeLink = ({ isActive }) => (isActive) ? 'registration__link_active' : 'registration__link';

  // переменные состояния для валидации инпутов и чекбокса
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

  // переменные состояния для общей валидации
  const [formValid, setFormValid] = useState(false);

  // переменные состояния для отслеживания фокуса при валидации инпутов
  const [nicknameFocused, setNicknameFocused] = useState(false);
  const [emailFocused, setEmailFocused] = useState(false);
  const [passwordFocused, setPasswordFocused] = useState(false);

  // переменные для попапа успешной регистрации
  const [showPopup, setShowPopup] = useState(false);

  // переменные для вывода серверной ошибки и установки соответствующего текста ошибки
  const [showError, setShowError] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);

  // общая функция для валидации инпутов и чекбокса формы
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
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
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
  const passwordRegex = /^[a-zA-Z0-9_-]+$/;

  const passwordHandler = (e) => {
    setPassword(e.target.value);
    if (!e.target.value) {
      setPasswordError('Поле не может быть пустым');
    } else if (e.target.value.length < 8 || e.target.value.length > 50 || !passwordRegex.test(e.target.value)) {
      setPasswordError('Только латиница (a-z), цифры (0-9), символы (_-), не меньше 8 и не больше 50 символов');
    } else {
      setPasswordError('');
    }
  }

  // функция для валидации чекбокса (используем isChecked, чтобы связать с событием  компонента Checkbox)
  const checkboxHandler = (isChecked) => {
    if (!isChecked) {
      setCheckboxError('');
    }
    setIsChecked(isChecked);
  };

  // Обработчик события при потере фокуса инпута
  const blurHandler = (e) => {
    switch (e.target.name) {
      case 'nickname':
        setNicknameDirty(true);
        setNicknameFocused(false);
        break;
      case 'email':
        setEmailDirty(true);
        setEmailFocused(false);
        break;
      case 'password':
        setPasswordDirty(true);
        setPasswordFocused(false);
        break;
      default:
      // Ничего не делаем. Добавление default является хорошей практикой.
    }
  }

  // Функция для обработки отправки формы (API)
  const handleSubmit = (e) => {
    e.preventDefault();

    const registrationData = {
      username: nickname,
      email: email,
      password: password
    };

    fetch('https://caseme.pythonanywhere.com/api/users/', {
      method: 'POST',
      body: JSON.stringify(registrationData),
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then((response) => {
        if (!response.ok) {
          console.error('Ошибка:', response.status);
          return response.json().then((data) => {
            let errorMessage = '';
            for (let key in data) {
              errorMessage += `${data[key][0]}\n`
            }
            console.log('errorMessage:', errorMessage);
            setErrorMessage(errorMessage);
            setShowError(true);
            throw new Error(errorMessage);
          });
        }
        console.log('Запрос выполнен успешно');
        setShowPopup(true);
        setShowError(false);
        setErrorMessage(null);
        return response.json();
      })
      .then((data) => {
        console.log('Получены данные:', data);
      })
      .catch((err) => {
        console.error('Ошибка:', err);
        setShowError(true);
      });
  };


  return (
    <div>
      {showError && (<ErrorNotification errorMessage={errorMessage} />)}
      <main className="content-registration">
        <div className="registration">
          <section className="registration__info">

            <nav>
              <ul className="registration__links">
                <NavLink to="/signin" className={activeLink}>Вход</NavLink>
                <NavLink to="/signup" className={activeLink}>Регистрация</NavLink>
              </ul>
            </nav>

            <form onSubmit={handleSubmit} noValidate>
              <div className="registration__input-container">
                <label className="registration__form-label" htmlFor="nickname">Никнейм</label>
                <input
                  onChange={e => { nicknameHandler(e); }}
                  value={nickname}
                  onBlur={e => blurHandler(e)}
                  onFocus={() => setNicknameFocused(true)}
                  className={`registration__input
                  ${nicknameDirty && nicknameError ? 'registration__input_type_error' : ''}
                  ${nicknameError === 'Только латиница (a-z), цифры (0-9), символы (_-.@), не меньше 3 и не больше 20 символов' && !nicknameFocused ? 'registration__input_type_error-big' : ''}`}
                  id="nickname"
                  type="text"
                  name="nickname"
                  placeholder="@" required />
                {(nicknameDirty && nicknameError && !nicknameFocused) && <span className={`registration__input-error nickname-error
                ${nicknameError === 'Только латиница (a-z), цифры (0-9), символы (_-.@), не меньше 3 и не больше 20 символов' ? 'registration__input-error-big' : ''}`}>{nicknameError}</span>}
              </div>

              <div className="registration__input-container">
                <label className="registration__form-label" htmlFor="email">E-mail</label>
                <input
                  onChange={e => emailHandler(e)}
                  value={email}
                  onBlur={e => blurHandler(e)}
                  onFocus={() => setEmailFocused(true)}
                  className={`registration__input ${emailDirty && emailError ? 'registration__input_type_error' : ''}`}
                  id="email"
                  type="email"
                  name="email"
                  required />
                {(emailDirty && emailError && !emailFocused) && <span className="registration__input-error email-error">{emailError}</span>}
              </div>

              <div className="registration__input-container">
                <label className="registration__form-label" htmlFor="password">Пароль</label>
                <input
                  onChange={e => passwordHandler(e)}
                  value={password}
                  onBlur={e => blurHandler(e)}
                  onFocus={() => setPasswordFocused(true)}
                  className={`registration__input
                  ${passwordDirty && passwordError ? 'registration__input_type_error' : ''}
                  ${passwordError === 'Длина пароля не может быть меньше 8 и больше 50 символов' && !passwordFocused ? 'registration__input_type_error-big' : ''}`}
                  placeholder="Не менее 8 символов"
                  id="password"
                  type="password"
                  name="password"
                  required />
                {(passwordDirty && passwordError && !passwordFocused) && <span className={`registration__input-error password-error
                ${passwordError === 'Длина пароля не может быть меньше 8 и больше 50 символов' ? 'registration__input-error-big' : ''}`}>{passwordError}</span>}
              </div>


              <div className="registration__checkbox-form">
                <Checkbox
                  onChange={e => checkboxHandler(e)}
                  checked={isChecked}
                  id="checkbox"
                  name="checkbox" />
                <p className="registration__policy-text">Я согласен с <Link className="registration__policy-link" to="/privacypolicy" target="_blank">Политикой конфиденциальности</Link>{" "}и{" "}<Link className="registration__policy-link" to="/useragreement" target="_blank">Пользовательским соглашением</Link></p>
                {checkboxError && <p>{checkboxError}</p>}
              </div>

              <button
                type="submit"
                className={`registration__submit-button ${formValid && isChecked ? "registration__submit-button_active" : "registration__submit-button_disabled"}`}
                disabled={!formValid || !isChecked}>Зарегистрироваться</button>
            </form>
            {showPopup && (<PopupTooltip isOpen={true} onClose={() => {
              setShowPopup(false)
            }} />)}
          </section>
        </div>

      </main>

    </div>
  );
}

export default Register;