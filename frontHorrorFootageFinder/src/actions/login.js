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

export const ERROR_MESSAGE = 'ERROR_MESSAGE';

export const errorMessage = () => ({
  type: ERROR_MESSAGE,
});

// END LOGIN REFACTO

// on sauvegarde les changements de profiles dans le state:
export const SAVE_NEW_LOGIN_STATE = 'SAVE_NEW_LOGIN_STATE';
export const saveNewLoginState = (value) => ({
  type: SAVE_NEW_LOGIN_STATE,
  value,
});

// on vide le state à la supression du compte ou à la déconnexion:
export const CLEAR_STATE = 'CLEAR_STATE';
export const clearState = () => ({
  type: CLEAR_STATE,
});

export const LOCALSTORAGEMODIFYLOGIN = 'LOCALSTORAGEMODIFYLOGIN';
export const localStorageModifyLOGIN = (emailStore, pseudoStore, isLoggedStore, idStore) => ({
  type: LOCALSTORAGEMODIFYLOGIN,
  emailStore,
  pseudoStore,
  isLoggedStore,
  idStore,
});

export const LOCALSTORAGEMODIFYUI = 'LOCALSTORAGEMODIFYUI';
export const localStorageModifyUI = (watchlistStorage, watchedStorage) => ({
  type: LOCALSTORAGEMODIFYUI,
  watchlistStorage,
  watchedStorage,
});
