// SETTINGS
// afficher l'input de modificaiton d'une information personnem
export const TOGGLE_FIELD_INPUT = 'TOGGLE_FIELD_INPUT';
export const toggleFieldInput = (field) => ({
  type: TOGGLE_FIELD_INPUT,
  field,
});
// edition des informations du profile (pseudo, email, mdp)
export const EDIT_FIELD_SETTINGS = 'EDIT_FIELD_SETTINGS';
export const editFieldSettings = (value, field) => ({
  type: EDIT_FIELD_SETTINGS,
  value,
  field,
});
export const EDIT_PASSWORD_SETTINGS = 'EDIT_PASSWORD_SETTINGS';
export const editPasswordSettings = () => ({
  type: EDIT_PASSWORD_SETTINGS,
});
export const CHANGE_SETTINGS_VALUE = 'CHANGE_SETTINGS_VALUE';
export const changeSettingsValue = (value, field) => ({
  type: CHANGE_SETTINGS_VALUE,
  value,
  field,
});
export const CANCEL_SETTINGS_CHANGE = 'CANCEL_SETTINGS_CHANGE';
export const cancelSettingsChange = () => ({
  type: CANCEL_SETTINGS_CHANGE,
});
