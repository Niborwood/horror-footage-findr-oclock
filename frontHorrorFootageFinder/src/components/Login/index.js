import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { NavLink, Redirect } from 'react-router-dom';
import { changeInputValueLogin, login } from '../../actions/login';
import Field from '../Field';
import Button from '../Button';
import Divider from '../Divider';
import './login.scss';

export function Login({
  changeField, onLogin, isLogged, errorMessage,
}) {
  let textErrorMessage = '';
  if (errorMessage) {
    textErrorMessage = 'Identifiants incorrectes';
  }
  if (isLogged) {
    // redirection sur la page d'accueil si l'utilisateur est logé
    return <Redirect to="/" />;
  }
  const onSubmit = (event) => {
    event.preventDefault();
    onLogin();
  };
  return (
    <div className="login__container">
      <h1 className="login___title">Login</h1>
      <form className="login__form" onSubmit={onSubmit}>
        <Field name="Email" type="email" onChange={changeField} />
        <Field name="Mot de passe" type="password" onChange={changeField} />
        {textErrorMessage}
        <Button className="" textContent="Valider" type="submit" />
      </form>
      <Divider />
      <NavLink to="/register" className="login__to-register">pas encore de compte ?</NavLink>
      <Button className="button__home" to="/" textContent="Retour à l'accueil" />

    </div>
  );
}
const mapStateToProps = (state) => ({
  loginEmail: state.login.registerEmail,
  onLogin: state.login.registerPassword,
  isLogged: state.login.isLogged,
  errorMessage: state.login.errorMessage,
});
const mapDispatchToProps = (dispatch) => ({
  changeField: (value, name) => {
    const action = changeInputValueLogin(value, name);
    dispatch(action);
  },
  onLogin: () => {
    const action = login();
    dispatch(action);
  },
});
Login.propTypes = {
  changeField: PropTypes.func.isRequired,
  onLogin: PropTypes.func.isRequired,
  isLogged: PropTypes.bool.isRequired,
  errorMessage: PropTypes.bool.isRequired,
};
export default connect(mapStateToProps, mapDispatchToProps)(Login);
