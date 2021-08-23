// LOGIN REFACTO

export const CHANGE_INPUT_VALUE_LOGIN = 'CHANGE_INPUT_VALUE_LOGIN';
export const changeInputValueLogin = (value, name) => ({
  type: CHANGE_INPUT_VALUE_LOGIN,
  value,
  name,
});

export const TOGGLE_CONNECTED = 'TOGGLE_CONNECTED';
export const toggleConnected = () => ({
  type: TOGGLE_CONNECTED,
});

export const CHANGE_STATE_WHEN_CONNECTED = 'CHANGE_STATE_WHEN_CONNECTED';
export const changeStateWhenConnected = (value, token) => ({
  type: CHANGE_STATE_WHEN_CONNECTED,
  value,
  token,
});

export const LOGIN = 'LOGIN';
export const login = () => ({
  type: LOGIN,
});

// END LOGIN REFACTO
