import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';

import './button.scss';

export function Button({
  textContent, onClick, to, className, type,
}) {
  return (
    <button
      className={`button-ui ${className}`}
      onClick={onClick}
      // eslint-disable-next-line react/button-has-type
      type={type}
    >
      {to ? <NavLink to={to}>{textContent}</NavLink> : textContent }
    </button>
  );
}

Button.propTypes = {
  textContent: PropTypes.string.isRequired,
  onClick: PropTypes.func,
  to: PropTypes.string,
  className: PropTypes.string,
  type: PropTypes.string,
};

Button.defaultProps = {
  onClick: () => {},
  to: null,
  className: '',
  type: 'button',
};

const mapStateToProps = () => ({
});

const mapDispatchToProps = () => ({

});

export default connect(mapStateToProps, mapDispatchToProps)(Button);
