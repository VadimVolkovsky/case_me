import React from "react";
import "./FormEmailRequest.css";
import FormRequest from "../FormRequest/FormRequest";

function FormEmailRequest() {
  return (
    <FormRequest
      name="email"
      title="Восстановление пароля"
      textSubmit="Отправить"
      children={
        <fieldset className="form__fieldset">
          <label className="form__label">
            <span className="form__input-title">E-mail</span>
            <input
              type="email"
              name="email"
              id="email__input"
              placeholder="Введите почту"
              className="form__input"
              required
            />
            <span className="form__input-error"></span>
          </label>
        </fieldset>
      }
    />
  );
}

export default FormEmailRequest;
