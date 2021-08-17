import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
// import { Link } from 'react-router-dom';
import { changeInputValue } from '../../actions';
import Field from './Field';
import './register.scss';

export const Register = ({ changeField }) => {
  const onSubmit = (event) => {
    event.preventDefault();
  };
  return (
    <div className="register___container">
      <h1 className="register___title">Register</h1>
      <form className="register__form" onSubmit={onSubmit}>
        <Field name="Email" onChange={changeField} />
        <Field name="Mot de passe" onChange={changeField} />
        <Field name="Confirmation du mot de passe" onChange={changeField} />
        <button className="register__form__button" type="submit">Valider</button>
      </form>
      <span className="register__form__link">jai déjà un compte</span>
    </div>
  );
};
const mapStateToProps = () => ({

});
const mapDispatchToProps = (dispatch) => ({
  changeField: (value, name) => {
    const action = changeInputValue(value, name);
    dispatch(action);
  },
});
Register.propTypes = {
  changeField: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Register);
