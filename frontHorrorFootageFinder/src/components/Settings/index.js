/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import MenuTitle from '../MenuTitle';
import MenuItem from '../MenuItem';
import Modal from '../Modal';

import './settings.scss';
import {
  toggleFieldInput,
  cancelSettingsChange,
  editProfileInformations,
  submitSettings,
  closeInput,
  updateTextInfo,
  deleteAccount,
} from '../../actions/settings';
import {
  toggleModal,
} from '../../actions/ui';
import { clearUser } from '../../actions/login';

export const Settings = ({
  textInfo,
  pseudo,
  pseudoInput,
  email,
  emailInput,
  passwordInput,
  modal,
  onClickEdit,
  onClickCancel,
  onChangeEditField,
  onSubmitSettings,
  onCloseInput,
  onDeleteAccount,
  onToggleModal,
  changeTextInfo,
  signOut,
}) => {
  // On ferme les inputs quand on change de page
  useEffect(() => () => {
    onCloseInput();
    if (modal) onToggleModal();
  }, []);

  return (
    <div className="settings">
      {modal
        ? (
          <Modal
            title="Suppression du compte"
            onCancel={onToggleModal}
            onConfirm={onDeleteAccount}
            redirect="/"
            textContent="Etes-vous sur de vouloir supprimer votre compte ?"
          />
        )
        : null}
      <h1 className="settings__title">settings</h1>
      <div>
        <form onSubmit={onSubmitSettings}>
          <p className="settings__info">{textInfo}</p>
          <MenuTitle content="informations utilisateur" />
          <div className="settings__item"> pseudo : </div>
          {/* le même schéma se reproduit 3 fois
          (pour le pseudo, le mail, le password) à factoriser ?
          on check le bool input false > on affiche un bouton edit
                                 true  > on affiche l'input pour modif le profile */}
          {pseudoInput
            ? (
              <div>
                <input type="text" className="settings__input" placeholder={pseudo} field="newPseudo" onChange={onChangeEditField} />
                <button type="submit" className="settings__button">valider</button>
                <button type="button" className="settings__button" onClick={onClickCancel}>annuler</button>
              </div>
            )
            : (
              <div>
                {pseudo}
                <button type="button" value="pseudoInput" onClick={onClickEdit} className="settings__button">edit</button>
              </div>
            )}
          <div className="settings__item"> email : </div>
          {emailInput
            ? (
              <div>
                <input type="email" className="settings__input" placeholder={email} field="newEmail" onChange={onChangeEditField} />
                <button type="submit" className="settings__button">valider</button>
                <button type="button" className="settings__button" onClick={onClickCancel}>annuler</button>
              </div>
            )
            : (
              <div>
                {email}
                <button type="button" value="emailInput" onClick={onClickEdit} className="settings__button">edit</button>
              </div>
            )}
          <MenuTitle content="securite" />
          <div className="security-container">
            {passwordInput
              ? (
                <>
                  Nouveau mot de passe :
                  <input type="text" className="settings__input" field="newPassword" onChange={onChangeEditField} />
                  Confirmer le mot de passe :
                  <input type="text" className="settings__input" field="newPasswordConfirm" onChange={onChangeEditField} />
                  <div>
                    <button type="submit" className="settings__button">valider</button>
                    <button type="button" className="settings__button" onClick={onClickCancel}>annuler</button>
                  </div>
                </>
              )
              : (
                <MenuItem onClick={onClickEdit} textContent="Modifier le mot de passe" value="passwordInput" className="setting-button" />
              )}
            <MenuItem textContent="Déconnexion" onClick={signOut} to="/" />
            {/* Simple modale de confirmation pour la supressoin du compte.
            Ca fait pas très pro, comment améliorer ça ?
            Envoyer un mail à l'utilisateur qui permettrai de valider la suppression du compte ? */}
            <MenuItem
              textContent="Supprimer le compte"
              onClick={() => {
                onToggleModal();
              }}
            />
            <div className="settings__section__separator" />
            <MenuItem
              onClick={() => {
                navigator.clipboard.writeText('http://localhost:3000/');
                changeTextInfo('lien copié dans le presse-papier');
              }}
              textContent="Partager le site"
            />
            <MenuItem to="/" textContent="Retour a la page d'accueil" />
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
  modal: PropTypes.bool.isRequired,
  onClickEdit: PropTypes.func.isRequired,
  onClickCancel: PropTypes.func.isRequired,
  onChangeEditField: PropTypes.func.isRequired,
  onSubmitSettings: PropTypes.func.isRequired,
  onCloseInput: PropTypes.func.isRequired,
  onDeleteAccount: PropTypes.func.isRequired,
  changeTextInfo: PropTypes.func.isRequired,
  onToggleModal: PropTypes.func.isRequired,
  signOut: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  textInfo: state.settings.textInfo,
  pseudo: state.login.pseudo,
  pseudoInput: state.settings.pseudoInput,
  email: state.login.email,
  emailInput: state.settings.emailInput,
  passwordInput: state.settings.passwordInput,
  modal: state.ui.modal,
});

const mapDispatchToProps = (dispatch) => ({
  onClickEdit: (event) => {
    event.preventDefault();
    dispatch(toggleFieldInput(event.currentTarget.value));
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
  onDeleteAccount: () => {
    localStorage.clear();
    dispatch(deleteAccount());
  },
  changeTextInfo: (value) => {
    dispatch(updateTextInfo(value));
  },
  onToggleModal: () => {
    dispatch(toggleModal());
  },
  signOut: () => {
    localStorage.clear();
    dispatch(clearUser());
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Settings);
