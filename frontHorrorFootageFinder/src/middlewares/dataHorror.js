/* eslint-disable no-console */
import {
  LOGIN,
  toggleConnected,
  changeStateWhenConnected,
  errorMessage,
} from '../actions/login';
import {
  SUBMITREGISTER,
} from '../actions/register';
import {
  submitWatchlistAndWatched,
  ADD_MOVIE_IN_WATCHED,
  ADD_MOVIE_IN_WATCHLIST,
  REMOVE_MOVIE_IN_WATCHED,
  REMOVE_MOVIE_IN_WATCHLIST,
  addMovieInReducer,
  removeMovieInReducer,
} from '../actions/watchlist';
import {
  RATE_MOVIE, saveRateInState,
} from '../actions/rating';
import api from '../utils/api';

const dataHorror = (store) => (next) => (action) => {
  switch (action.type) {
    case SUBMITREGISTER: {
      const submitRegister = async () => {
        try {
          const state = store.getState();
          const getPseudo = state.register.registerPseudo;
          const getEmail = state.register.registerEmail;
          const getPassword = state.register.registerConfirmPassword;
          await api.post('register/', {
            pseudo: getPseudo,
            email: getEmail,
            password: getPassword,
          });
        } catch (error) {
          console.log('error', error);
        }
      };
      submitRegister();
      break;
    }

    case LOGIN: {
      const login = async () => {
        try {
          const state = store.getState();
          const getEmail = state.login.loginEmail;
          const getPassword = state.login.loginPassword;
          const response = await api.post('login', {
            email: getEmail,
            password: getPassword,
          });
          console.log('data', response.data);
          console.log('token', response.data.token);
          console.log('response watched', response.data.watched);
          console.log('response watchlist', response.data.watchlist);
          store.dispatch(changeStateWhenConnected(response.data.data, response.data.token));
          store.dispatch(submitWatchlistAndWatched(response.data.watchlist[0],
            response.data.watched[0]));
          // eslint-disable-next-line dot-notation
          api.defaults.headers.common['authorization'] = `Bearer ${response.data.token}`;
          if (response.data.data.pseudo) {
            store.dispatch(toggleConnected());
            localStorage.setItem({
              token: response.data.token,
              pseudo: response.data.data.pseudo,
              email: response.data.data.email,
            });
          }
        } catch (error) {
          console.log('error', error);
          store.dispatch(errorMessage());
        }
      };
      login();
      break;
    }

    case RATE_MOVIE: {
      const rateMovieDataBase = async () => {
        try {
          const state = store.getState();
          const { value } = action;
          const { movieID } = action;
          await api.put(`user/${state.login.id}/rating/movie/${movieID}`, {
            rating: value,
          });
          // TODO dispatch une action pour mettre la note du user dans le state.
          store.dispatch(saveRateInState(movieID, parseFloat(value)));
        } catch (error) {
          console.log('error', error);
        }
      };
      rateMovieDataBase();
      break;
    }

    case ADD_MOVIE_IN_WATCHED: {
      const submitAddMovieInWatched = async () => {
        try {
          const state = store.getState();
          const getWatched = state.ui.watched;
          const getIdUser = state.login.id;
          if (!getWatched.includes(action.newWatchedId)) {
            const response = await api.post(`/user/${getIdUser}/watched/${action.newWatchedId}`);
            console.log('add movie watched', response);
            store.dispatch(addMovieInReducer('watched', action.newWatchedId));
          }
        } catch (error) {
          console.log('error', error);
        }
      };
      submitAddMovieInWatched();
      break;
    }

    case ADD_MOVIE_IN_WATCHLIST: {
      const submitAddMovieInWatchlist = async () => {
        try {
          const state = store.getState();
          const getWatchList = state.ui.watchList;
          if (!getWatchList.includes(action.newWatchlistId)) {
            const getIdUser = state.login.id;
            console.log('getiduser', getWatchList);
            const response = await api.post(`/user/${getIdUser}/watchlist/${action.newWatchlistId}`);
            console.log('add movie watchlist', response);
            store.dispatch(addMovieInReducer('watchList', action.newWatchlistId));
          }
        } catch (error) {
          console.log('error', error);
        }
      };
      submitAddMovieInWatchlist();
      break;
    }

    case REMOVE_MOVIE_IN_WATCHED: {
      const submitRemoveMovieInWatched = async () => {
        try {
          const state = store.getState();
          console.log('newWatchlised', action.movieID);
          const getIdUser = state.login.id;
          console.log('getiduser', getIdUser);
          const response = await api.patch(`/user/${getIdUser}/watched/${action.movieID}`);
          console.log('remove watched', response);
          store.dispatch(removeMovieInReducer('watched', action.movieID));
        } catch (error) {
          console.log('error', error);
        }
      };
      submitRemoveMovieInWatched();
      break;
    }

    case REMOVE_MOVIE_IN_WATCHLIST: {
      const submitRemoveMovieInWatchlist = async () => {
        try {
          const state = store.getState();
          const getIdUser = state.login.id;
          const response = await api.patch(`/user/${getIdUser}/watchlist/${action.movieID}`);
          console.log('remove watchlist', response);
          store.dispatch(removeMovieInReducer('watchList', action.movieID));
        } catch (error) {
          console.log('error', error);
        }
      };
      submitRemoveMovieInWatchlist();
      break;
    }
    default:
      next(action);
  }
};

export default dataHorror;
