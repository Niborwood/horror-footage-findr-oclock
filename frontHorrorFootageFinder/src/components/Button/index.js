import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { toLoginTrue } from '../../actions';

export const Button = ({ textContent, onClickLogin }) => (
  <button onClick={onClickLogin} type="button">
    {textContent}
  </button>
);

Button.propTypes = {
  textContent: PropTypes.string.isRequired,
  onClickLogin: PropTypes.func.isRequired,
};

const mapStateToProps = () => ({
});

const mapDispatchToProps = (dispatch) => ({
  onClickLogin: () => {
    dispatch(toLoginTrue());
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Button);
