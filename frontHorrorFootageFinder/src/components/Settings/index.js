import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import './settings.scss';
import {
  toggleFieldInput,
  cancelSettingsChange,
  editProfileInformations,
  submitSettings,
} from '../../actions/settings';

export const Settings = ({
  pseudo,
  pseudoInput,
  email,
  emailInput,
  onClickEdit,
  onClickCancel,
  onChangeEditField,
  onSubmitSettings,
}) => (
  <div className="settings">
    <h1 className="settings__title">settings</h1>
    <div>
      <h2 className="settings__sub-title">informations utilisateur</h2>
      <form onSubmit={onSubmitSettings}>
        <div className="settings__item"> pseudo : </div>
        {pseudoInput
          ? (
            <div>
              <input type="text" placeholder={pseudo} field="newPseudo" onChange={onChangeEditField} />
              <button type="submit">valider</button>
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
      </form>

    </div>
  </div>
);

Settings.propTypes = {
  pseudo: PropTypes.string.isRequired,
  pseudoInput: PropTypes.bool.isRequired,
  email: PropTypes.string.isRequired,
  emailInput: PropTypes.bool.isRequired,
  onClickEdit: PropTypes.func.isRequired,
  onClickCancel: PropTypes.func.isRequired,
  onChangeEditField: PropTypes.func.isRequired,
  onSubmitSettings: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  pseudo: state.login.pseudo,
  pseudoInput: state.settings.pseudoInput,
  email: state.login.email,
  emailInput: state.settings.emailInput,
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
});

export default connect(mapStateToProps, mapDispatchToProps)(Settings);
