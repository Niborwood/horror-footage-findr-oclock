import axios from 'axios';

// UI Actions
export const PASS_SPLASH = 'PASS_SPLASH';
export const passSplash = () => ({
  type: PASS_SPLASH,
});

export const TOGGLE_LOADING = 'TOGGLE_LOADING';
export const toggleLoading = () => ({
  type: TOGGLE_LOADING,
});

// Quiz Action
export const CHOOSE_AN_ANSWER = 'CHOOSE_AN_ANSWER';
export const SWITCH_TO_NEXT_QUESTION = 'SWITCH_TO_NEXT_QUESTION';

export const chooseAnAnswser = (answer) => ({
  type: CHOOSE_AN_ANSWER,
  answer,
});

export const switchToNextQuestion = () => ({
  type: SWITCH_TO_NEXT_QUESTION,
});

// REGISTER-LOGIN Actions
export const CHANGE_INPUT_VALUE = 'CHANGE_INPUT_VALUE';
export const SUBMIT_FORM = 'SUBMIT_FORM';
export const TOGGLE_MASKED = 'TOGGLE_MASKED';
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

// MovieInfo Actions
export const SET_CURRENT_MOVIE_DATA = 'SET_CURRENT_MOVIE_DATA';
export const setCurrentMovieData = (currentMovieData) => ({
  type: SET_CURRENT_MOVIE_DATA,
  currentMovieData,
});
// Thunk
export function fetchMovieData(movieID) {
  return (dispatch) => {
    dispatch(toggleLoading());
    axios.get(`https://api.themoviedb.org/3/movie/${movieID}?api_key=${process.env.REACT_APP_TMDB_API_KEY}&language=fr-FR`)
      .then((response) => {
        dispatch(setCurrentMovieData(response.data));
      });
  };
}

export const SET_CURRENT_MOVIE_PROVIDERS = 'SET_CURRENT_MOVIE_PROVIDERS';
export const setCurrentMovieProviders = (currentMovieProviders) => ({
  type: SET_CURRENT_MOVIE_PROVIDERS,
  currentMovieProviders,
});
// Thunk
export function fetchMovieProviders(movieID) {
  return (dispatch) => {
    dispatch(toggleLoading());
    axios.get(`https://api.themoviedb.org/3/movie/${movieID}/watch/providers?api_key=${process.env.REACT_APP_TMDB_API_KEY}&language=fr-FR`)
      .then((response) => {
        dispatch(setCurrentMovieProviders(response.data.results.FR));
      });
  };
}
