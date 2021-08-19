/* eslint-disable react/jsx-one-expression-per-line */
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';

import './settings.scss';
import {
  toggleFieldInput,
  editFieldSettings,
  editPasswordSettings,
  changeSettingsValue,
  cancelSettingsChange,
} from '../../actions';

export const Settings = ({
  pseudo,
  pseudoInput,
  email,
  emailInput,
  password,
  passwordInput,
  onClickEdit,
  onSubmitSaveChange,
  onSubmitPasswordChange,
  onChangeEditField,
  onClickCancel,
}) => (
  <div className="settings">
    <h1 className="settings__title">settings</h1>
    <div>
      <h2 className="settings__sub-title">informations utilisateur</h2>
      <ul>
        <li className="settings__item">pseudo : {pseudoInput
          ? (
            <form onSubmit={onSubmitSaveChange} field="pseudo" value="newPseudo">
              <input type="text" field="newPseudo" onChange={onChangeEditField} placeholder={pseudo} />
              <button type="submit">valider</button>
              <button type="button" onClick={onClickCancel}>annuler</button>
            </form>
          )
          : <div> {pseudo} <button type="button" value="pseudoInput" onClick={onClickEdit} className="settings__edit__button">edit</button> </div>}
        </li>
        <li className="settings__item">adresse email : {emailInput
          ? (
            <form onSubmit={onSubmitSaveChange} field="email" value="newEmail">
              <input type="email" field="newEmail" onChange={onChangeEditField} placeholder={email} />
              <button type="submit">valider</button>
              <button type="button" onClick={onClickCancel}>annuler</button>
            </form>
          )
          : <div> {email} <button type="button" value="emailInput" onClick={onClickEdit} className="settings__edit__button">edit</button> </div>}
        </li>
      </ul>
    </div>
    <div>
      <h2 className="settings__sub-title">securite</h2>
      <ul>
        {passwordInput
          ? (
            <li>
              <form onSubmit={onSubmitPasswordChange} field="password" value="newPassword">
                Nouveau mot de passe : <input type="text" field="newPassword" onChange={onChangeEditField} />
                Confirmer le mot de passe : <input type="text" field="newPasswordConfirm" onChange={onChangeEditField} />
                <button type="submit">valider</button>
                <button type="button" onClick={onClickCancel}>annuler</button>
              </form>
            </li>
          )
          : <li>modifier le mot de passe<button type="button" value="passwordInput" onClick={onClickEdit} className="settings__edit__button">edit</button></li>}
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
  passwordInput: PropTypes.bool.isRequired,
  onClickEdit: PropTypes.func.isRequired,
  onSubmitSaveChange: PropTypes.func.isRequired,
  onSubmitPasswordChange: PropTypes.func.isRequired,
  onChangeEditField: PropTypes.func.isRequired,
  onClickCancel: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  pseudo: state.settings.pseudo,
  pseudoInput: state.settings.pseudoInput,
  email: state.settings.email,
  emailInput: state.settings.emailInput,
  password: state.settings.password,
  passwordInput: state.settings.passwordInput,
});

const mapDispatchToProps = (dispatch) => ({
  onClickEdit: (event) => {
    dispatch(toggleFieldInput(event.target.value));
  },
  onSubmitSaveChange: (event) => {
    event.preventDefault();
    dispatch(editFieldSettings(
      event.nativeEvent.path[0].attributes.value.nodeValue,
      event.nativeEvent.path[0].attributes.field.nodeValue,
    ));
  },
  onSubmitPasswordChange: (event) => {
    event.preventDefault();
    dispatch(editPasswordSettings());
  },
  onChangeEditField: (event) => {
    dispatch(changeSettingsValue(
      event.target.value,
      event.nativeEvent.path[0].attributes.field.nodeValue,
    ));
  },
  onClickCancel: () => {
    dispatch(cancelSettingsChange());
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Settings);
