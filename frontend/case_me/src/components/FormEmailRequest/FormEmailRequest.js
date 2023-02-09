import React, { useState } from "react";
import "./FormEmailRequest.css";
import FormRequest from "../FormRequest/FormRequest";

function FormEmailRequest() {

  const [email, setEmail] = useState("");
  const [formValid, setFormValid] = useState(false);
  const [emailError, setEmailError] = useState("");

  function handleChangeEmail(e) {
    setEmail(e.target.value);

    const regexEmail = /^([\w]+@([\w-]+\.)+[\w-]{2,4})?$/;

    if(e.target.value.length === 0){
      setFormValid(false);
      setEmailError('Поле не может быть пустым');
    } else if (!regexEmail.test(String(e.target.value).toLocaleLowerCase())){
      setFormValid(false);
      setEmailError('Некорректный email');
    } else {
      setFormValid(true);
      setEmailError('');
    }
  }



  return (
    <FormRequest
      name="email"
      title="Восстановление пароля"
      textSubmit="Отправить"
      formValid={formValid}
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
              value={email}
              onChange={handleChangeEmail}
              required
            />
            <span className="form__input-error">{emailError}</span>
          </label>
        </fieldset>
      }
    />
  );
}

export default FormEmailRequest;
