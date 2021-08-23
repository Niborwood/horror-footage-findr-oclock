// UI ACTIONS

// Pass Splash
export const PASS_SPLASH = 'PASS_SPLASH';
export const passSplash = () => ({
  type: PASS_SPLASH,
});

// Toggle Action
export const TOGGLE_ACTION = 'TOGGLE_ACTION';
export const toggleAction = (toggleName) => ({
  type: TOGGLE_ACTION,
  toggleName,
});
