export const TO_LOGIN_TRUE = 'TO_LOGIN_TRUE';
export const CHANGE_INPUT_VALUE = 'CHANGE_INPUT_VALUE';
export const SUBMIT_FORM = 'SUBMIT_FORM';

export const toLoginTrue = () => ({
  type: TO_LOGIN_TRUE,
});
export const changeInputValue = (value, name) => ({
  type: CHANGE_INPUT_VALUE,
  value,
  name,
});
export const submitForm = (value) => ({
  type: SUBMIT_FORM,
  value,
});
