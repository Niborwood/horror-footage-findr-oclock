import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
// import { Link } from 'react-router-dom';
import { changeInputValue, submitForm } from '../../actions';
import Field from './Field';
import './register.scss';

export const Register = ({
  changeField, registerPassword, registerConfirmPassword, textConfirm, onSubmitForm,
}) => {
  const password = registerPassword;
  const confirmPassword = registerConfirmPassword;
  const onSubmit = (event) => {
    event.preventDefault();
    if (password !== confirmPassword) {
      onSubmitForm('confirmation incorrecte');
    } else {
      onSubmitForm('confirmation correcte');
    }
  };
  return (
    <div className="register___container">
      <h1 className="register___title">Register</h1>
      <form className="register__form" onSubmit={onSubmit}>
        <Field type="email" name="Email" onChange={changeField} />
        <Field type="password" name="Mot de passe" onChange={changeField} />
        <Field type="password" name="Confirmation du mot de passe" onChange={changeField} />
        {textConfirm}
        <button className="register__form__button" type="submit">Valider</button>
      </form>
      <span className="register__form__link">jai déjà un compte</span>
    </div>
  );
};

const mapStateToProps = (state) => ({
  registerPassword: state.registerPassword,
  registerConfirmPassword: state.registerConfirmPassword,
  textConfirm: state.textConfirm,
});
const mapDispatchToProps = (dispatch) => ({
  changeField: (value, name) => {
    const action = changeInputValue(value, name);
    dispatch(action);
  },
  onSubmitForm: (value) => {
    const action = submitForm(value);
    dispatch(action);
  },
});

Register.propTypes = {
  changeField: PropTypes.func.isRequired,
  registerPassword: PropTypes.string.isRequired,
  registerConfirmPassword: PropTypes.string.isRequired,
  textConfirm: PropTypes.string.isRequired,
  onSubmitForm: PropTypes.func.isRequired,
};
Field.defaultProps = {
  registerPassword: '',
  registerConfirmPassword: '',
};

export default connect(mapStateToProps, mapDispatchToProps)(Register);
