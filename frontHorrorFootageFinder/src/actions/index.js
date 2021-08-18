export const CHOOSE_AN_ANSWER = 'CHOOSE_AN_ANSWER';
export const SWITCH_TO_NEXT_QUESTION = 'SWITCH_TO_NEXT_QUESTION';
// Pass Splash Action
export const PASS_SPLASH = 'PASS_SPLASH';
export const passSplash = () => ({
  type: PASS_SPLASH,
});

// Store the current movie data for MovieInfo component
export const SET_CURRENT_MOVIE_DATA = 'SET_CURRENT_MOVIE_DATA';
export const setCurrentMovieData = (currentMovieData) => ({
  type: SET_CURRENT_MOVIE_DATA,
  currentMovieData,
});

export const chooseAnAnswser = (answer) => ({
  type: CHOOSE_AN_ANSWER,
  answer,
});

export const switchToNextQuestion = () => ({
  type: SWITCH_TO_NEXT_QUESTION,
});
