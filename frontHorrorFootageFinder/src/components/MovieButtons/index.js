import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  addMovieInWatchlist,
  addMovieInWatched,
  removeMovieInWatchlist,
  removeMovieInWatched,
} from '../../actions/watchlist';
import Button from '../Button';

import './moviebuttons.scss';

import { updateQuizResultIndex } from '../../actions/movies';
import { resetQuiz } from '../../actions/quiz';

export const MovieButtons = ({
  format, quizResults,
  resultsLength,
  currentIndex,
  updateResultsIndex,
  onResetQuizz,
  handleAddWatchList,
  handleAddWatched,
  movieID,
  watchlist,
  watched,
  handleRemoveMovieInWatlist,
  handlerRemoveMovieInWatched,
}) => (
  <div className="movie-buttons">
    {!watched[0].includes(movieID) ? <Button textContent="Déjà vu" onClick={() => handleAddWatched(movieID)} /> : <Button textContent="retirer de la liste des déjà vu" onClick={() => handlerRemoveMovieInWatched(movieID)} />}
    {!watchlist[0].includes(movieID) ? <Button textContent="Ajouter à ma liste" onClick={() => handleAddWatchList(movieID)} /> : <Button textContent="retirer de la liste des films à voir" onClick={() => handleRemoveMovieInWatlist(movieID)} />}
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

MovieButtons.propTypes = {
  format: PropTypes.string.isRequired,
  quizResults: PropTypes.arrayOf(PropTypes.number).isRequired,
  resultsLength: PropTypes.number.isRequired,
  updateResultsIndex: PropTypes.func.isRequired,
  currentIndex: PropTypes.number.isRequired,
  onResetQuizz: PropTypes.func.isRequired,
  handleAddWatchList: PropTypes.func.isRequired,
  handleAddWatched: PropTypes.func.isRequired,
  movieID: PropTypes.func.isRequired,
  watchlist: PropTypes.arrayOf(PropTypes.number).isRequired,
  watched: PropTypes.arrayOf(PropTypes.number).isRequired,
  handleRemoveMovieInWatlist: PropTypes.func.isRequired,
  handlerRemoveMovieInWatched: PropTypes.func.isRequired,
};

const mapStateToProps = ({
  movies: {
    quizResults: {
      tmdbIDs: quizResults,
      currentIndex,
    },
  },
  ui,
}) => ({
  quizResults,
  resultsLength: quizResults.length,
  currentIndex,
  watchlist: ui.watchList,
  watched: ui.watched,
});

const mapDispatchToProps = (dispatch) => ({
  updateResultsIndex: () => dispatch(updateQuizResultIndex()),
  onResetQuizz: () => {
    dispatch(resetQuiz());
  },
  handleAddWatchList: (newWatchlistId) => {
    console.log('yo1');
    const action = addMovieInWatchlist(newWatchlistId);
    dispatch(action);
  },
  handleAddWatched: (newWatchedId) => {
    console.log('yo2');
    const action = addMovieInWatched(newWatchedId);
    dispatch(action);
  },
  handlerRemoveMovieInWatched: (newWatchedId) => {
    console.log('yo2');
    const action = removeMovieInWatched(newWatchedId);
    dispatch(action);
  },
  handleRemoveMovieInWatlist: (newWatchlistId) => {
    console.log('yo2');
    const action = removeMovieInWatchlist(newWatchlistId);
    dispatch(action);
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(MovieButtons);
