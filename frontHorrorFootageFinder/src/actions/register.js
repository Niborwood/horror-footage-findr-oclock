// REGISTER Actions
export const CHANGE_INPUT_VALUE = 'CHANGE_INPUT_VALUE';

export const SUBMIT_FORM = 'SUBMIT_FORM';
export const TOGGLE_MASKED = 'TOGGLE_MASKED';
export const SUBMITREGISTER = 'SUBMIT_REGISTER';
export const changeInputValue = (value, name) => ({
  type: CHANGE_INPUT_VALUE,
  value,
  name,
});
export const submitForm = (value) => ({
  type: SUBMIT_FORM,
  value,
});

export const toggleMasked = () => ({
  type: TOGGLE_MASKED,
});

// Corentin Register Actions
export const submitRegister = (pseudo, email, password) => ({
  type: SUBMITREGISTER,
  pseudo,
  email,
  password,
});