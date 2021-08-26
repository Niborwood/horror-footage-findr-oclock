import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';

import './menuItem.scss';

export function MenuItem({
  textContent, onClick, to, value,
}) {
  return (
    <button
      className="menu-item-ui"
      onClick={onClick}
        // eslint-disable-next-line react/button-has-type
      type="button"
      value={value}
    >
      {to ? <NavLink to={to}>{textContent}</NavLink> : textContent }
    </button>
  );
}

MenuItem.propTypes = {
  textContent: PropTypes.string.isRequired,
  onClick: PropTypes.func,
  to: PropTypes.string,
  value: PropTypes.string,
};

MenuItem.defaultProps = {
  onClick: () => {},
  to: null,
  value: null,
};

const mapStateToProps = () => ({
});

const mapDispatchToProps = () => ({

});

export default connect(mapStateToProps, mapDispatchToProps)(MenuItem);
