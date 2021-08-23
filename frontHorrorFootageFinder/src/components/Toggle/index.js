import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

export const Toggle = ({ textContent }) => (
  <div className="toggle-ui">
    {textContent}
  </div>
);

Toggle.propTypes = {
  textContent: PropTypes.string.isRequired,
};

const mapStateToProps = () => ({

});

const mapDispatchToProps = {

};

export default connect(mapStateToProps, mapDispatchToProps)(Toggle);
