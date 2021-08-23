import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { changeInputValueLogin, login } from '../../actions/login';
import Field from '../Field';
import Button from '../Button';
import Divider from '../Divider';
import './login.scss';

export function Login({ changeField, onLogin }) {
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
        <Button className="" textContent="Valider" type="submit" />
      </form>
      <Divider />
      <NavLink to="/register" className="login__to-register">pas encore de compte ?</NavLink>
      <Button to="/" textContent="Retour à l'accueil" />
    </div>
  );
}
const mapStateToProps = (state) => ({
  loginEmail: state.login.registerEmail,
  onLogin: state.login.registerPassword,
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
};
export default connect(mapStateToProps, mapDispatchToProps)(Login);
