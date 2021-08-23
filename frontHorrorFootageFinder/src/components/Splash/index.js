import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { passSplash } from '../../actions/ui';

// SCSS
import './splash.scss';

// COMPONENTS
import Toggle from '../Toggle';

// FONCTION
export const Splash = ({ onPassSplash }) => (
  <div className="splash">
    <div className="splash__launch-app">
      <NavLink to="/" onClick={onPassSplash}>Play The Game</NavLink>
    </div>
    <div className="splash__options">
      <div className="splash__options-item">
        <Toggle name="toggleAnimations" textContent="Retirer les animations" />
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
