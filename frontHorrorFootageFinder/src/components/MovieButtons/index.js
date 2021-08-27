/* eslint-disable no-nested-ternary */
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  addMovieInWatchlist,
  addMovieInWatched,
  removeMovieInWatchlist,
  removeMovieInWatched,
} from '../../actions/watchlist';

// SCSS
import './moviebuttons.scss';

// COMPOSANTS EXTERNES
import Button from '../Button';
import Divider from '../Divider';

// IMPORTS D'ACTIONS
import { updateQuizResultIndex } from '../../actions/movies';
import { quizInit } from '../../actions/quiz';

//! ON REFACTO CA EN PRIORITE

export const MovieButtons = ({
  format, quizResults,
  resultsLength,
  currentIndex,
  updateResultsIndex,
  onResetQuizz,
  handleAddMovieWatchList,
  handleAddMovieInWatched,
  movieID,
  watchlist,
  watched,
  handleRemoveMovieInWatlist,
  handlerRemoveMovieInWatched,
  isLogged,
}) => {
  console.log('watchlistinjsx', watchlist);
  return (
    <div className="movie-buttons">
      {/* TEMPORARY version */}
      {isLogged
        ? !watched.includes(movieID)
          ? <Button textContent="Déjà vu" onClick={() => handleAddMovieInWatched(movieID)} />
          : <Button textContent="retirer de la liste des déjà vu" onClick={() => handlerRemoveMovieInWatched(movieID)} /> : null}

      {isLogged
        ? !watchlist.includes(movieID)
          ? <Button textContent="Ajouter à ma liste" onClick={() => handleAddMovieWatchList(movieID)} />
          : <Button textContent="retirer de la liste des films à voir" onClick={() => handleRemoveMovieInWatlist(movieID)} /> : null}

      {/* Affichage conditionnel si le format = full seulement */}
      {format === 'full' && (
      <>
        {/* Si le currentIndex dépasse le nombre de résultats, on n'affiche pas le bouton */}
        {currentIndex < resultsLength - 1 && (
        <Button
          to={`/movie/${quizResults[currentIndex + 1]}`}
          onClick={updateResultsIndex}
          textContent="Autre résultat"
        />
        )}
        <Button to="/quiz" textContent="Relancer le quiz" onClick={onResetQuizz} />
      </>
      )}
    </div>
  );
};

MovieButtons.propTypes = {
  format: PropTypes.string.isRequired,
  quizResults: PropTypes.arrayOf(PropTypes.number).isRequired,
  resultsLength: PropTypes.number.isRequired,
  updateResultsIndex: PropTypes.func.isRequired,
  currentIndex: PropTypes.number.isRequired,
  onResetQuizz: PropTypes.func.isRequired,
  handleAddMovieWatchList: PropTypes.func.isRequired,
  handleAddMovieInWatched: PropTypes.func.isRequired,
  movieID: PropTypes.number.isRequired,
  watchlist: PropTypes.arrayOf(PropTypes.number).isRequired,
  watched: PropTypes.arrayOf(PropTypes.number).isRequired,
  handleRemoveMovieInWatlist: PropTypes.func.isRequired,
  handlerRemoveMovieInWatched: PropTypes.func.isRequired,
  isLogged: PropTypes.bool.isRequired,
};

const mapStateToProps = ({
  movies: {
    quizResults: {
      tmdbIDs: quizResults,
      currentIndex,
    },
  },
  ui,
  login,
}) => ({
  quizResults,
  resultsLength: quizResults.length,
  currentIndex,
  watchlist: ui.watchList,
  watched: ui.watched,
  isLogged: login.isLogged,

});

const mapDispatchToProps = (dispatch) => ({
  updateResultsIndex: () => dispatch(updateQuizResultIndex()),
  onResetQuizz: () => {
    dispatch(quizInit());
  },
  handleAddMovieWatchList: (newWatchlistId) => {
    const action = addMovieInWatchlist(newWatchlistId);
    dispatch(action);
  },
  handleAddMovieInWatched: (newWatchedId) => {
    const action = addMovieInWatched(newWatchedId);
    dispatch(action);
  },
  handlerRemoveMovieInWatched: (movieID) => {
    const action = removeMovieInWatched(movieID);
    dispatch(action);
  },
  handleRemoveMovieInWatlist: (movieID) => {
    const action = removeMovieInWatchlist(movieID);
    dispatch(action);
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(MovieButtons);
