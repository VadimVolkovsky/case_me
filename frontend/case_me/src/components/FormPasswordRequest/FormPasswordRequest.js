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
  const [buttonDisabled, setButtonDisabled] = useState(true);
  const [messageError, setMessageError] = useState("");
  // заглушка для проверки навигации, пока не прописаны запросы к бэку
  const [isUpdatePassword, setIsUpdatePassword] = useState(false);

  // Навигация по сайту
  let navigate = useNavigate();

  // Валидация первого поля формы
  function handleChangePassword(e) {
    setMessageError("");
    setPassword(e.target.value);
    setFormValid(e.target.closest("form").checkValidity());
    setPasswordError(e.target.validationMessage);
  }

  // Валидация второго поля формы
  function handleChangeRepeatPassword(e) {
    setMessageError("");
    setRepeatPassword(e.target.value);
    setFormValid(e.target.closest("form").checkValidity());
    setPasswordRepeatError(e.target.validationMessage);
  }

  // функция проверки на все ошибки
  function checkForm() {
    if (password !== repeatPassword) {
      setFormValid(false);
      setButtonDisabled(true);
      setMessageError("Пароли не совпадают");
    } else if (formValid !== true) {
      setIsUpdatePassword(false);
      console.log("Обновление почты не удалось");
    } else {
      setIsUpdatePassword(true);
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
              type="text"
              name="password"
              id="password__input"
              placeholder="Введите новый пароль"
              className="form__input"
              value={password}
              onChange={handleChangePassword}
              minLength={8}
              required
            />
            <span className="form__input-error">{passwordError}</span>
          </label>
          <label className="form__label">
            <span className="form__input-title">Повторите пароль</span>
            <input
              type="text"
              name="password-repeat"
              id="password-repeat__input"
              placeholder="Введите новый пароль"
              className="form__input"
              value={repeatPassword}
              onChange={handleChangeRepeatPassword}
              minLength={8}
              required
            />
            <span className="form__input-error">{passwordRepeatError}</span>
          </label>
          <p>{messageError}</p>
        </fieldset>
      }
    />
  );
}

export default FormPasswordRequest;
