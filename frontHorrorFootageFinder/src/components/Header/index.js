import React from 'react';
// import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';

import './header.scss';

const Header = () => (
  <header className="header">
    <div className="header__leftmenu">
      <div className="header__stby">STBY</div>
      <div className="header__accountmenu"><NavLink to="/login">CAMERA INCONNUE/:?? LOGIN?</NavLink></div>
    </div>
    <h1 className="header__title">
      <div className="header__logo">
        [
        <span className="font-red">●</span>
        ]
      </div>
      <div className="header__app-title">
        <NavLink to="/">
          <div>FOUND</div>
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
};

const mapStateToProps = () => ({

});

const mapDispatchToProps = {

};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
