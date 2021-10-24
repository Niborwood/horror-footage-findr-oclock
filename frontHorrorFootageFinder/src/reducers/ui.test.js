import UIReducer, { initialState as uiInitState } from './ui';
import { toggleAction } from '../actions/ui';

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
    expect(UIReducer(uiInitState, toggleAction('toggleAnimations'))).toEqual({
      ...uiInitState,
      toggles: {
        ...uiInitState.toggles,
        toggleAnimations: false,
      },
    });
  });
});
