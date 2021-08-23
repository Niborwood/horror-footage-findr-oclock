import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';

import {
  changeInputValue,
  submitForm,
  toggleMasked,
  submitRegister,
} from '../../actions/register';

import Field from '../Field';
import Button from '../Button';
import Divider from '../Divider';
import './register.scss';

export const Register = ({
  changeField,
  registerEmail,
  registerPassword,
  registerConfirmPassword,
  registerPseudo,
  textConfirm, onSubmitForm,
  inputMasked,
  changetoggleMasked,
  onSubmitRegister,
}) => {
  const onSubmit = (event) => {
    event.preventDefault();
    if (registerPassword !== registerConfirmPassword && registerEmail.length === 0) {
      onSubmitForm('Un email est nécessaire et la confirmation est incorrecte');
    } else if (registerPassword !== registerConfirmPassword) {
      onSubmitForm('confirmation incorrecte');
    } else if (registerEmail.length === 0) {
      onSubmitForm('Un email est nécessaire');
    } else {
      onSubmitForm('confirmation correcte');
      onSubmitRegister(registerPseudo, registerEmail, registerConfirmPassword);
    }
  };
  return (
    <div className="register___container">
      <h1 className="register___title">Register</h1>
      <form className="register__form" onSubmit={onSubmit}>
        <Field type="email" name="Email" onChange={changeField} />
        <Field type="text" name="Pseudo" onChange={changeField} />
        <div className="register__form__confirmPassword__container">
          <Field type={inputMasked ? 'password' : 'text'} name="Mot de passe" onChange={changeField} />
          <button className="register__form__button__masked" type="button" onClick={changetoggleMasked}><div className="register__form__button__masked__rond">.</div></button>
        </div>

        <div className="register__form__confirmPassword__container">
          <Field type={inputMasked ? 'password' : 'text'} name="Confirmation du mot de passe" onChange={changeField} />
          <button className="register__form__button__masked" type="button" onClick={changetoggleMasked}><div className="register__form__button__masked__rond">.</div></button>
        </div>

        {textConfirm}
        <Button type="submit" textContent="Valider" />
      </form>
      <Divider />
      <NavLink to="/login" className="register__form__link">j&apos;ai déjà un compte</NavLink>
    </div>
  );
};

const mapStateToProps = (state) => ({
  registerEmail: state.register.registerEmail,
  registerPassword: state.register.registerPassword,
  registerPseudo: state.register.registerPseudo,
  registerConfirmPassword: state.register.registerConfirmPassword,
  textConfirm: state.register.textConfirm,
  inputMasked: state.register.inputMasked,
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
  changetoggleMasked: () => {
    const action = toggleMasked();
    dispatch(action);
  },
  onSubmitRegister: (pseudo, email, password) => {
    const action = submitRegister(pseudo, email, password);
    dispatch(action);
  },
});

Register.propTypes = {
  changeField: PropTypes.func.isRequired,
  registerPassword: PropTypes.string.isRequired,
  registerConfirmPassword: PropTypes.string.isRequired,
  textConfirm: PropTypes.string.isRequired,
  onSubmitForm: PropTypes.func.isRequired,
  registerEmail: PropTypes.string.isRequired,
  inputMasked: PropTypes.bool.isRequired,
  changetoggleMasked: PropTypes.func.isRequired,
  onSubmitRegister: PropTypes.func.isRequired,
  registerPseudo: PropTypes.string.isRequired,
};
Field.defaultProps = {
  registerPassword: '',
  registerConfirmPassword: '',
  registerPseudo: '',
};

export default connect(mapStateToProps, mapDispatchToProps)(Register);
