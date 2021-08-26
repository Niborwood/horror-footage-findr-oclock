/* eslint-disable react/no-unescaped-entities */
import React from 'react';
import PropTypes from 'prop-types';
// import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';

import './header.scss';

const Header = ({ pseudo }) => {
  let cameraDisplay;
  if (pseudo !== undefined) {
    if (pseudo.slice(-1).toLowerCase() === 's') {
      cameraDisplay = "' CAMERA";
    } else {
      cameraDisplay = "'S CAMERA";
    }
  }

  return (
    <header className="header">
      <div className="header__leftmenu">
        <div className="header__stby">STBY</div>
        <div className="header__accountmenu">
          {pseudo ? (
            <NavLink to="/profile">
              {pseudo}
              {cameraDisplay}
            </NavLink>
          ) : <NavLink to="/login">CAMERA INCONNUE/:?? LOGIN?</NavLink> }

        </div>
      </div>

      <h1 className="header__title">
        <div className="header__logo">
          [
          <span className="font-red">●</span>
          ]
        </div>
        <div className="header__app-title">
          <NavLink to="/">
            <div>HORROR</div>
            <div>FOOTAGE</div>
            <div>
              FINDR
              <span className="font-red">.</span>
            </div>
          </NavLink>
        </div>
      </h1>
    </header>
  );
};

Header.propTypes = {
  pseudo: PropTypes.string,
};

Header.defaultProps = {
  pseudo: '',
};

const mapStateToProps = (state) => ({
  pseudo: state.login.pseudo,
});

const mapDispatchToProps = {

};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
