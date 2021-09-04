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
export const Splash = ({ onPassSplash, toggleAnimations }) => (
  <div className="splash">
    <div className="splash__launch-app">
      <NavLink to="/" onClick={onPassSplash}>Play The Game</NavLink>
    </div>
    <div className="splash__options">
      <div className="splash__options-item">
        <Toggle textContent={toggleAnimations ? 'Animations activées' : 'Animations désactivées'} name="toggleAnimations" />
      </div>
    </div>
  </div>
);

Splash.propTypes = {
  onPassSplash: PropTypes.func.isRequired,
  toggleAnimations: PropTypes.bool.isRequired,
};

const mapStateToProps = ({ ui: { toggles: { toggleAnimations } } }) => ({
  toggleAnimations,
});

const mapDispatchToProps = (dispatch) => ({
  onPassSplash: () => {
    dispatch(passSplash());
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Splash);
