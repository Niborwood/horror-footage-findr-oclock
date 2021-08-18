import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';

export const Profile = () => (
  <div>
    <h1>Compte Utilisateur</h1>
    <ol>
      <li><NavLink to="/watchlist" className="">watchlist</NavLink></li>
      <li><NavLink to="/settings" className="">settings</NavLink></li>
    </ol>
    <div><NavLink to="/" className="">Retour à la page d&apos;accueil</NavLink></div>
  </div>
);

Profile.propTypes = {
};

const mapStateToProps = () => ({

});

const mapDispatchToProps = {

};

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
