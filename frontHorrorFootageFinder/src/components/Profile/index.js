import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';

import MenuItem from '../MenuItem';

import './profile.scss';

export const Profile = () => (
  <div>
    <h1 className="profile__main-title">Compte Utilisateur</h1>
    <div className="profile__container">
      <MenuItem to="/watchlist" textContent="watchlist" />
      <MenuItem to="/settings" textContent="settings" />
      <MenuItem to="/" textContent="Retour à la page d'accueil" />
    </div>
  </div>
);

Profile.propTypes = {
};

const mapStateToProps = () => ({

});

const mapDispatchToProps = {

};

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
