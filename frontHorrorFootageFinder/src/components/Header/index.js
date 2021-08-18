import React from 'react';
// import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import './header.scss';

const Header = () => (
  <header className="header">
    <div className="header__leftmenu">
      <div className="header__stby">STBY</div>
      <div className="header__accountmenu">CAMERA INCONNUE/:?? LOGIN?</div>
    </div>
    <h1 className="header__title">
      <div className="header__logo">
        [
        <span className="font-red">●</span>
        ]
      </div>
      <div className="header__app-title">
        <div>FOUND</div>
        <div>FOOTAGE</div>
        <div>
          FINDR
          <span className="font-red">.</span>
        </div>
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
