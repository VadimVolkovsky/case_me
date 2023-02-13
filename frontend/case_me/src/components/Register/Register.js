import React from "react";
import Checkbox from '../Checkbox/Checkbox';
import { Link, useLocation } from "react-router-dom";
import './Register.css';



function Register() {

  const location = useLocation();
  const activeLink = (path) => location.pathname === path ? 'registration__link_active' : '';

  return (
    <div>
      <main className="content">
        <div className="registration">
          <section className="registration__info">
            <nav>
              <ul className="registration__links">
                <Link className="registration__link-decor" to="/signin"><a href="/signin" className={`registration__link ${activeLink('/sigin')}`}>Вход</a></Link>
                <Link className="registration__link-decor" to="/signup"><a href="/signup" className={`registration__link ${activeLink('/signup')}`}>Регистрация</a></Link>
              </ul>
            </nav>

            <form action="/" className="registration__form" novalidate>
              <label className="registration__form-label" for="name">Никнейм</label>
              <input className="registration__input registration__input_type_name" id="name" type="text" name="name" placeholder="@" required />
                <span className="registration__input-error name-error"></span>

                <label className="registration__form-label" for="email">E-mail</label>
                <input className="registration__input registration__input_type_email" id="email" type="email" name="email" required />
                  <span className="registration__input-error email-error"></span>

                  <label className="registration__form-label" for="password">Пароль</label>
                  <input className="registration__input registration__input_type_password" placeholder="Не менее 8 символов" id="password" type="password" name="password" minlength="8" required />
                    <span className="registration__input-error password-error"></span>

                    <div className="registration__checkbox-form">
                      <Checkbox id="checkbox" name="checkbox" required={true} />
                      <p class="registration__policy-text">Я согласен с <Link class="registration__policy-link" href="#">Политикой конфиденциальности</Link> и <Link class="registration__policy-link" href="#">Пользовательским соглашением</Link></p>
                    </div>

                    <Link className="registration__link-decor" to="/info"><a href="/info" class="registration__submit-button registration__link-decor" type="submit" disabled="true">Зарегистрироваться</a></Link>
                  </form>
                </section>
              </div>

            </main>

        </div>
        );
}

        export default Register;