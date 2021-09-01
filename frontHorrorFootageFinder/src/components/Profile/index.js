import React from 'react';
import { connect } from 'react-redux';
import MenuItem from '../MenuItem';
import './profile.scss';

export const Profile = () => (
  <div className="menu-holder">
    <MenuTitle content="compte utilisateur" title="main" />
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
