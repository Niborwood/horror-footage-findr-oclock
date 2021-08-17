import React from 'react';
import PropTypes from 'prop-types';
import './style.scss';

export default function Field({ name }) {
  return (
    <>
      <label className="register__form__label" htmlFor={name}>
        {name}
        <input className="register__form__input" name={name} type="text" placeholder={name} />
      </label>
    </>
  );
}
Field.propTypes = {
  name: PropTypes.string,
};
Field.defaultProps = {
  name: '',

};
