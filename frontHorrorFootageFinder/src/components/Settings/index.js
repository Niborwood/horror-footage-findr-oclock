/* eslint-disable react/jsx-one-expression-per-line */
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';

import './settings.scss';
import { toggleFieldInput, editFieldSettings, changeSettingsValue } from '../../actions';

export const Settings = ({
  pseudo,
  pseudoInput,
  email,
  emailInput,
  password,
  onClickEdit,
  onSubmitSaveChange,
  onChangeEditField,
}) => (
  <div className="settings">
    <h1 className="settings__title">settings</h1>
    <div>
      <h2 className="settings__sub-title">informations utilisateur</h2>
      <ul>
        <li className="settings__item">pseudo : {pseudoInput
          ? <form onSubmit={onSubmitSaveChange}><input type="text" field="pseudo" onChange={onChangeEditField} placeholder={pseudo} /> </form>
          : <div> {pseudo} <button type="button" value="pseudoInput" onClick={onClickEdit} className="settings__edit__button">edit</button> </div>}
        </li>
        <li className="settings__item">adresse email : {emailInput
          ? <form onSubmit={onSubmitSaveChange}><input type="text" field="email" onChange={onChangeEditField} placeholder={email} /> </form>
          : <div> {email} <button type="button" value="emailInput" onClick={onClickEdit} className="settings__edit__button">edit</button> </div>}
        </li>
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
  pseudo: PropTypes.string.isRequired,
  pseudoInput: PropTypes.bool.isRequired,
  email: PropTypes.string.isRequired,
  emailInput: PropTypes.bool.isRequired,
  password: PropTypes.string.isRequired,
  onClickEdit: PropTypes.func.isRequired,
  onSubmitSaveChange: PropTypes.func.isRequired,
  onChangeEditField: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  pseudo: state.settings.pseudo,
  pseudoInput: state.settings.pseudoInput,
  email: state.settings.email,
  emailInput: state.settings.emailInput,
  password: state.settings.password,
});

const mapDispatchToProps = (dispatch) => ({
  onClickEdit: (event) => {
    dispatch(toggleFieldInput(event.target.value));
  },
  onSubmitSaveChange: (event) => {
    event.preventDefault();
    dispatch(editFieldSettings());
  },
  onChangeEditField: (event) => {
    dispatch(changeSettingsValue(event.target.value,
      event.nativeEvent.path[0].attributes.field.nodeValue));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Settings);
