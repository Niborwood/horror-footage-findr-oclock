import React from 'react';
import PropTypes from 'prop-types';
import './style.scss';

export default function Field({ name, onChange, type }) {
  const handleChange = (event) => {
    onChange(event.target.value, name);
  };
  return (
    <>
      <label className="register__form__label" htmlFor={name}>
        {/* {name} */}
        <input type={type} className="register__form__input" name={name} placeholder={name} onChange={handleChange} />
      </label>
    </>
  );
}
Field.propTypes = {
  name: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  type: PropTypes.string,
};
Field.defaultProps = {
  name: '',
  type: '',
};
