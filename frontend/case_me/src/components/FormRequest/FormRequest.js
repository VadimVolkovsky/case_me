import React from "react";
import "./FormRequest.css"

function FormRequest(props) {

const {name, title, textSubmit, children} = props

  return (
    <div className={`form form_type_${name}`}>
      <form className="form__content" noValidate>
      <h2 className="form__title">{title}</h2>
     {children}
        <button type="submit" className="form__button">{textSubmit}</button>
      </form>
      
    </div>
  );
}

export default FormRequest;