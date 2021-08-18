import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';

import './settings.scss';

export const Settings = () => (
  <div className="settings">
    <h1 className="settings__title">settings</h1>
    <div>
      <h2 className="settings__sub-title">informations utilisateur</h2>
      <ul>
        <li>pseudo</li>
        <li>adresse email</li>
      </ul>
    </div>
    <div>
      <h2 className="settings__sub-title">securite</h2>
      <ul>
        <li>modifier le mot de passe</li>
        <li>deconnexion</li>
        <li>supprimer le compte</li>
      </ul>
    </div>
    <div className="share__button">partager le site</div>
    <div><NavLink to="/">Retour a la page d&apos;accueil</NavLink></div>
  </div>
);

Settings.propTypes = {
};

const mapStateToProps = () => ({

});

const mapDispatchToProps = {

};

export default connect(mapStateToProps, mapDispatchToProps)(Settings);
