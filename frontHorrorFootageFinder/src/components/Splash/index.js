import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { passSplash } from '../../actions';

import './splash.scss';

export const Splash = ({ onPassSplash }) => (
  <div className="splash">
    <div className="splash__launch-app">
      <NavLink to="/" onClick={onPassSplash}>Play The Game</NavLink>
    </div>
    <div className="splash__options">
      <div className="splash__options-item">
        [ ] RETIRER LES ANIMATIONS
      </div>
    </div>
  </div>
);

Splash.propTypes = {
  onPassSplash: PropTypes.func.isRequired,
};

const mapStateToProps = () => ({

});

const mapDispatchToProps = (dispatch) => ({
  onPassSplash: () => {
    dispatch(passSplash());
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Splash);
