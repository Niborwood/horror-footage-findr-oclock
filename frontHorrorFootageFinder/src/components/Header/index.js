import React from 'react';
import PropTypes from 'prop-types';
// import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';

import './header.scss';

const Header = ({ pseudo }) => (
  <header className="header">
    <div className="header__leftmenu">
      <div className="header__stby">STBY</div>
      <div className="header__accountmenu">
        {/* Lien conditionnel si l'utilisateur est connecté */}
        {pseudo ? (
          <NavLink className="header__account-link" to="/settings">{`${pseudo}'S CAMERA/:`}</NavLink>
        ) : (
          <NavLink to="/login">CAMERA INCONNUE/:?? LOGIN?</NavLink>
        )}
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

Header.propTypes = {
  pseudo: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => ({
  pseudo: state.login.pseudo,

});

const mapDispatchToProps = {

};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
