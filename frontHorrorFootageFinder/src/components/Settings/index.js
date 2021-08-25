/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';

import Button from '../Button';

import './settings.scss';
import {
  toggleFieldInput,
  cancelSettingsChange,
  editProfileInformations,
  submitSettings,
  closeInput,
  updateTextInfo,
} from '../../actions/settings';

export const Settings = ({
  textInfo,
  pseudo,
  pseudoInput,
  email,
  emailInput,
  passwordInput,
  onClickEdit,
  onClickCancel,
  onChangeEditField,
  onSubmitSettings,
  onCloseInput,
  changeTextInfo,
}) => {
  // On ferme les inputs quand on change de page
  useEffect(() => () => {
    onCloseInput();
  }, []);

  return (
    <div className="settings">
      <h1 className="settings__title">settings</h1>
      <div>
        <form onSubmit={onSubmitSettings}>
          <p className="settings__info">{textInfo}</p>
          <h2 className="settings__sub-title">informations utilisateur</h2>
          <div className="settings__item"> pseudo : </div>
          {/* le même schéma se reproduit 3 fois
          (pour le pseudo, le mail, le password) à factoriser ?
          on check le bool input false > on affiche un bouton edit
                                 true  > on affiche l'input pour modif le profile */}
          {pseudoInput
            ? (
              <div>
                <input type="text" placeholder={pseudo} field="newPseudo" onChange={onChangeEditField} />
                <button type="submit">valider</button>
                {/* bouton qui vide les champs dans le state et ferme les inputs */}
                <button type="button" onClick={onClickCancel}>annuler</button>
              </div>
            )
            : (
              <div>
                {pseudo}
                <button type="button" value="pseudoInput" onClick={onClickEdit} className="settings__edit__button">edit</button>
              </div>
            )}
          <div className="settings__item"> email : </div>
          {emailInput
            ? (
              <div>
                <input type="text" placeholder={email} field="newEmail" onChange={onChangeEditField} />
                <button type="submit">valider</button>
                <button type="button" onClick={onClickCancel}>annuler</button>
              </div>
            )
            : (
              <div>
                {email}
                <button type="button" value="emailInput" onClick={onClickEdit} className="settings__edit__button">edit</button>
              </div>
            )}
          <h2 className="settings__sub-title">Sécurité</h2>
          <div className="security-container">
            {passwordInput
              ? (
                <>
                  Nouveau mot de passe :
                  <input type="text" field="newPassword" onChange={onChangeEditField} />
                  Confirmer le mot de passe :
                  <input type="text" field="newPasswordConfirm" onChange={onChangeEditField} />
                  <button type="submit">valider</button>
                  <button type="button" onClick={onClickCancel}>annuler</button>
                </>
              )
              : (
                <Button onClick={onClickEdit} textContent="Modifier le mot de passe" value="passwordInput" className="setting-button" />
              )}
            <Button textContent="Déconnexion" className="setting-button" />
            <Button textContent="Supprimer le compte" className="setting-button" />
            <Button
              onClick={() => {
                navigator.clipboard.writeText('http://localhost:3000/');
                changeTextInfo('lien copié dans le presse-papier');
              }}
              textContent="Partager le site"
              className="setting-button"
            />
            <div><NavLink to="/">Retour a la page d&apos;accueil</NavLink></div>
          </div>
        </form>
      </div>
    </div>
  );
};

Settings.propTypes = {
  textInfo: PropTypes.string.isRequired,
  pseudo: PropTypes.string.isRequired,
  pseudoInput: PropTypes.bool.isRequired,
  email: PropTypes.string.isRequired,
  emailInput: PropTypes.bool.isRequired,
  passwordInput: PropTypes.bool.isRequired,
  onClickEdit: PropTypes.func.isRequired,
  onClickCancel: PropTypes.func.isRequired,
  onChangeEditField: PropTypes.func.isRequired,
  onSubmitSettings: PropTypes.func.isRequired,
  onCloseInput: PropTypes.func.isRequired,
  changeTextInfo: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  textInfo: state.settings.textInfo,
  pseudo: state.login.pseudo,
  pseudoInput: state.settings.pseudoInput,
  email: state.login.email,
  emailInput: state.settings.emailInput,
  passwordInput: state.settings.passwordInput,
});

const mapDispatchToProps = (dispatch) => ({
  onClickEdit: (event) => {
    event.preventDefault();
    dispatch(toggleFieldInput(event.target.value));
  },
  onClickCancel: () => {
    dispatch(cancelSettingsChange());
  },
  onChangeEditField: (event) => {
    dispatch(editProfileInformations(
      event.target.value,
      event.nativeEvent.path[0].attributes.field.nodeValue,
    ));
  },
  onSubmitSettings: (event) => {
    event.preventDefault();
    dispatch(submitSettings());
  },
  onCloseInput: () => {
    dispatch(closeInput());
  },
  changeTextInfo: (value) => {
    dispatch(updateTextInfo(value));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Settings);
