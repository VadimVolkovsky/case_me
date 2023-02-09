import React, { useState } from "react";
import "./FormPasswordRequest.css";
import FormRequest from "../FormRequest/FormRequest";

function FormPasswordRequest() {
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [formValid, setFormValid] = useState(false);
  const [passwordError, setPasswordError] = useState("");
  const [passwordRepeatError, setPasswordRepeatError] = useState("");

  function handleChangePassword(e) {
    setPassword(e.target.value);
    setFormValid(e.target.closest('form').checkValidity());
    setPasswordError(e.target.validationMessage);
  }

  function handleChangeRepeatPassword(e) {
    setRepeatPassword(e.target.value);
    setFormValid(e.target.closest('form').checkValidity());
    setPasswordRepeatError(e.target.validationMessage);
  }

  return (
    <FormRequest
      name="password"
      title="Изменение пароля"
      textSubmit="Сохранить"
      formValid={formValid}
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
        </fieldset>
      }
    />
  );
}

export default FormPasswordRequest;
