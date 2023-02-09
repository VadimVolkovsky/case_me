import React from "react";
import "./FormRequest.css"

function FormRequest(props) {

const {name, title, textSubmit, children, formValid} = props

function handleSubmit(e){
  e.preventDefault()
}

  return (
    <div className={`form form_type_${name}`}>
      <form className="form__content" onSubmit={handleSubmit} noValidate>
      <h2 className="form__title">{title}</h2>
     {children}
        <button type="submit" disabled={!formValid} className={`form__button ${formValid ? "form__button_active" : "form__button_disabled"}`}>{textSubmit}</button>
      </form>
      
    </div>
  );
}

export default FormRequest;