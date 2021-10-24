import UIReducer, { initialState as uiInitState } from './ui';

describe('UI Reducer test', () => {
  // Check the initialState is correct
  it('should return the initial state', () => {
    expect(UIReducer(undefined, {})).toEqual(uiInitState);
  });

  // Check if the toggle is working
  it('should toggle the animation from default true to false', () => {
    // Should default to true
    expect(uiInitState.toggles.toggleAnimations).toEqual(true);
    // Should toggle to false
    expect(UIReducer(uiInitState, { type: 'TOGGLE_ACTION', toggleName: 'toggleAnimations' })).toEqual({
      ...uiInitState,
      toggles: {
        ...uiInitState.toggles,
        toggleAnimations: false,
      },
    });
  });
});
