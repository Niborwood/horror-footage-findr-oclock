import React from 'react';
// import { Link } from 'react-router-dom';
import Field from './Field';
import './register.scss';

export default function Register() {
  return (
    <div className="register___container">
      <h1 className="register___title">Register</h1>
      <form className="register__form">
        <Field name="Email" />
        <Field name="Mot de passe" />
        <Field name="Confirmation du mot de passe" />
        <button className="register__form__button" type="submit">Valider</button>
      </form>
      <span className="register__form__link">jai déjà un compte</span>
    </div>
  );
}
