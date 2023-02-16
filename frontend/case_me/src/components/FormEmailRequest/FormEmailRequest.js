import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./FormEmailRequest.css";
import FormRequest from "../FormRequest/FormRequest";

function FormEmailRequest() {
  //Переменные состояния
  const [email, setEmail] = useState("");
  const [formValid, setFormValid] = useState(false);
  const [emailError, setEmailError] = useState("");
  const [emailDirty, setEmailDirty] = useState(false);

  // Навигация по сайту
  let navigate = useNavigate();

  // Валидация поля email
  function handleChangeEmail(e) {
    setEmail(e.target.value);
    const regexEmail = /^([\w]+@([\w-]+\.)+[\w-]{2,4})?$/;
    if (e.target.value.length === 0) {
      setFormValid(false);
      setEmailError("Поле не может быть пустым");
    } else if (!regexEmail.test(String(e.target.value).toLocaleLowerCase())) {
      setFormValid(false);
      setEmailError("Введите корректный e-mail");
    } else {
      setFormValid(true);
      setEmailError("");
    }
  }

  //Функция слежения за фокусом
  function blurHandler(e) {
    switch (e.target.name) {
      case "email":
        setEmailDirty(true);
        break;
    }
  }

  // Функция проверки на ошибки
  function checkForm() {
    if (formValid !== true) {
      console.log("Отправить сообщение на почту не удалось");
    } else {
      setFormValid(true);
      setEmailError("");
      setEmailDirty(false);
      navigate("/passwordrecovery");
      console.log("Обновление почты прошло успешно");
    }
  }

  // Отправка формы
  function handleSubmit(e) {
    e.preventDefault();
    checkForm();
  }

  const inputClass =
    emailDirty && emailError ? "form__input_type_error" : "form__input";

  return (
    <FormRequest
      name="email"
      title="Восстановление пароля"
      textSubmit="Отправить"
      formValid={formValid}
      onSubmit={handleSubmit}
      children={
        <fieldset className="form__fieldset">
          <label className="form__label">
            <span className="form__input-title">E-mail</span>
            <input
              type="email"
              name="email"
              id="email__input"
              placeholder="Введите почту"
              className={inputClass}
              value={email}
              onChange={handleChangeEmail}
              onBlur={blurHandler}
              required
            />
            {emailDirty && emailError && (
              <span className="form__input-error">{emailError}</span>
            )}
          </label>
        </fieldset>
      }
    />
  );
}

export default FormEmailRequest;
