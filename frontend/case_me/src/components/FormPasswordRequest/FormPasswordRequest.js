import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./FormPasswordRequest.css";
import FormRequest from "../FormRequest/FormRequest";

function FormPasswordRequest() {
  //Переменные состояния
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [formValid, setFormValid] = useState(false);
  const [passwordError, setPasswordError] = useState("");
  const [passwordRepeatError, setPasswordRepeatError] = useState("");
  const [passwordDirty, setPasswordDirty] = useState(false);
  const [passwordRepeatDirty, setPasswordRepeatDirty] = useState(false);
  const [buttonDisabled, setButtonDisabled] = useState(true);
  const [passwordFocused, setPasswordFocused] = useState(false);
  const [passwordRepeatFocused, setPasswordRepeatFocused] = useState(false);
  // заглушка для проверки навигации, пока не прописаны запросы к бэку
  const [isUpdatePassword, setIsUpdatePassword] = useState(false);

  // Навигация по сайту
  let navigate = useNavigate();

  // Валидация первого поля формы
  function handleChangePassword(e) {
    setPassword(e.target.value);
    if (e.target.value.length < 8 || e.target.value.length > 50) {
      setPasswordError(
        "Длина пароля не может быть меньше 8 и больше 50 символов"
      );
       setFormValid(false);
    } else if (e.target.value.length === 0) {
      setPasswordError("Поле не может быть пустым");
       setFormValid(false);
    } else {
       setPasswordError("");
      setFormValid(true);
    }
  }

  // Валидация второго поля формы
  function handleChangeRepeatPassword(e) {
    setRepeatPassword(e.target.value);
    if (e.target.value.length < 8 || e.target.value.length > 50) {
      setPasswordRepeatError(
        "Длина пароля не может быть меньше 8 и больше 50 символов"
      );
       setFormValid(false);
    } else if (e.target.value.length === 0) {
      setPasswordRepeatError("Поле не может быть пустым");
       setFormValid(false);
    } else {
      setPasswordRepeatError("");
      setFormValid(true);
    }
  }

  //Функция слежения за фокусом
  function blurHandler(e) {
    switch (e.target.name) {
      case "password":
        setPasswordDirty(true);
        setPasswordFocused(false);
        break;
      case "password-repeat":
        setPasswordRepeatDirty(true);
        setPasswordRepeatFocused(false);
        break;
    }
  }

  // функция проверки на все ошибки
  function checkForm() {
    if (password !== repeatPassword) {
      setFormValid(false);
      setButtonDisabled(true);
      setPasswordRepeatError("Пароли не совпадают");
    } else if (formValid !== true) {
      setIsUpdatePassword(false);
      console.log("Обновление почты не удалось");
    } else {
      setIsUpdatePassword(true);
      setPasswordDirty(false);
      setPasswordRepeatDirty(false);
      navigate("/passwordupdate");
      console.log("Обновление почты прошло успешно");
    }
  }

  // Отправка формы
  function handleSubmit(e) {
    e.preventDefault();
    checkForm();
  }


  return (
    <FormRequest
      name="password"
      title="Изменение пароля"
      textSubmit="Сохранить"
      formValid={formValid}
      onSubmit={handleSubmit}
      children={
        <fieldset className="form__fieldset">
          <label className="form__label">
            <span className="form__input-title">Новый пароль</span>
            <input
              type="password"
              name="password"
              id="password__input"
              placeholder="Введите новый пароль"
              className={`form__input ${(passwordDirty && passwordError && !passwordFocused) ? "form__input_type_error" : ""}`}
              value={password}
              onChange={handleChangePassword}
              onBlur={blurHandler}
              onFocus={() => setPasswordFocused(true)}
              minLength={8}
              required
            />
            {(passwordError && passwordDirty && !passwordFocused) &&
              <span className="form__input-error">{passwordError}</span>}
          </label>
          <label className="form__label">
            <span className="form__input-title">Повторите пароль</span>
            <input
              type="password"
              name="password-repeat"
              id="password-repeat__input"
              placeholder="Введите новый пароль"
              className={`form__input ${(passwordRepeatDirty && passwordRepeatError && !passwordRepeatFocused) ? "form__input_type_error"
                : ""}`}
              value={repeatPassword}
              onChange={handleChangeRepeatPassword}
              onBlur={blurHandler}
              onFocus={() => setPasswordRepeatFocused(true)}
              minLength={8}
              required
            />
            {(passwordRepeatDirty && passwordRepeatError && !passwordRepeatFocused) &&
              <span className="form__input-error">{passwordRepeatError}</span>}
          </label>
        </fieldset>
      }
    />
  );
}

export default FormPasswordRequest;
