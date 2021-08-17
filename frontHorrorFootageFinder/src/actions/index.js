export const TO_LOGIN_TRUE = 'TO_LOGIN_TRUE';
export const CHOOSE_AN_ANSWER = 'CHOOSE_AN_ANSWER';

export const toLoginTrue = () => ({
  type: TO_LOGIN_TRUE,
});

export const chooseAnAnswser = (answer) => ({
  type: CHOOSE_AN_ANSWER,
  answer,
});
