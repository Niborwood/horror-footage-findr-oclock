import React from 'react';
import { connect } from 'react-redux';
import MenuItem from '../MenuItem';

// SCSS
import './profile.scss';

// COMPOSANTS IMPORTES
import MenuTitle from '../MenuTitle';

// RENDU DU COMPOSANT
export const Profile = () => (
  <div className="menu-holder">
    <MenuTitle content="compte utilisateur" title="main" />
    <div className="profile__container">
      <MenuItem to="/watchlist" textContent="watchlist" />
      <MenuItem to="/settings" textContent="parametres" />
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
