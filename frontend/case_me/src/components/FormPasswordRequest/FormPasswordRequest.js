import React from "react";
import "./FormPasswordRequest.css";
import FormRequest from "../FormRequest/FormRequest";

function FormPasswordRequest() {
  return (
    <FormRequest
      name="password"
      title="Изменение пароля"
      textSubmit="Сохранить"
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
              minLength={8}
              required
            />
            <span className="form__input-error"></span>
          </label>
          <label className="form__label">
            <span className="form__input-title">Повторите пароль</span>
            <input
              type="text"
              name="password-repeat"
              id="password-repeat__input"
              placeholder="Введите новый пароль"
              className="form__input"
              minLength={8}
              required
            />
            <span className="form__input-error">Ошибка</span>
          </label>
        </fieldset>
      }
    />
  );
}

export default FormPasswordRequest;
