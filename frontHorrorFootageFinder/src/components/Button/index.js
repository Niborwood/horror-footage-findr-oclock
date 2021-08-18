import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

export const Button = ({ textContent }) => (
  <button onClick={() => {}} type="button">
    {textContent}
  </button>
);

Button.propTypes = {
  textContent: PropTypes.string.isRequired,
};

const mapStateToProps = () => ({
});

const mapDispatchToProps = () => ({

});

export default connect(mapStateToProps, mapDispatchToProps)(Button);
