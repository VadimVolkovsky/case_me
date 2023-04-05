import React from "react";
import "./FormRequest.css";
import ErrorNotification from "../ErrorNotification/ErrorNotification";

function FormRequest(props) {

  const { name, title, textSubmit, children, formValid, onSubmit } = props

  return (

    <div className="FormRequest">
      <div className={`form form_type_${name}`}>
        <ErrorNotification />
        <form className="form__content" onSubmit={onSubmit} noValidate>
          <h2 className="form__title">{title}</h2>
          {children}
          <button type="submit" disabled={!formValid} className={`form__button ${formValid ? "form__button_active" : "form__button_disabled"}`}>{textSubmit}</button>
        </form>
      </div>
    </div>
  );
}

export default FormRequest;