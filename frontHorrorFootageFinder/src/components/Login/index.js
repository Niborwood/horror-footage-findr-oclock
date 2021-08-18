import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { changeInputValueLogin } from '../../actions';
import Field from '../Field';
import './login.scss';

export function Login({ changeField }) {
  const onSubmit = (event) => {
    event.preventDefault();
    console.log('vous etes connecté');
  };
  return (
    <div className="login__container">
      <h1 className="login___title">Login</h1>
      <form className="login__form" onSubmit={onSubmit}>
        <Field name="Email" type="email" onChange={changeField} />
        <Field name="Mot de passe" type="password" onChange={changeField} />
        <button className="login__form__button" type="submit">Valider</button>
      </form>
      <NavLink to="/register" className="login__form__link">pas encore de compte ?</NavLink>
      <NavLink className="login__form__button" to="/"><button type="button">Retour à l&apos;accueil</button></NavLink>
    </div>
  );
}
const mapStateToProps = (state) => ({
  loginEmail: state.login.registerEmail,
  loginPassword: state.login.registerPassword,
});
const mapDispatchToProps = (dispatch) => ({
  changeField: (value, name) => {
    const action = changeInputValueLogin(value, name);
    dispatch(action);
  },
});
Login.propTypes = {
  changeField: PropTypes.func.isRequired,
};
export default connect(mapStateToProps, mapDispatchToProps)(Login);
