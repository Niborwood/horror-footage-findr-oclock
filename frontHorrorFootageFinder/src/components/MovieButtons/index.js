import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

// SCSS
import './moviebuttons.scss';

// COMPOSANTS EXTERNES
import Button from '../Button';
import Divider from '../Divider';

// IMPORTS D'ACTIONS
import { updateQuizResultIndex } from '../../actions/movies';
import { quizInit } from '../../actions/quiz';

export const MovieButtons = ({
  format, quizResults, resultsLength, currentIndex, updateResultsIndex, onResetQuizz,
}) => {
  // Affichage conditionnel du texte du nombre de résultats
  const numberOfResultsLeft = (resultsLength - currentIndex - 1);
  const moreResultsText = `${numberOfResultsLeft} ${numberOfResultsLeft > 1 ? 'autres résultats correspondent' : 'autre résultat correspond'} à vos crtières.`;

  return (
    <>
      {/* Buttons Holder */}
      <div className="movie-buttons">
        <Button textContent="Déjà vu" />
        <Button textContent="Ajouter à ma liste" />
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
      {/* Nombre de résultats restants */}
      {numberOfResultsLeft > 0 ? (
        <>
          <div className="movie-buttons__count">
            {moreResultsText}
          </div>
          <Divider />
        </>
      ) : <Divider />}
    </>
  );
};

MovieButtons.propTypes = {
  format: PropTypes.string.isRequired,
  quizResults: PropTypes.arrayOf(PropTypes.number).isRequired,
  resultsLength: PropTypes.number.isRequired,
  updateResultsIndex: PropTypes.func.isRequired,
  currentIndex: PropTypes.number.isRequired,
  onResetQuizz: PropTypes.func.isRequired,
};

const mapStateToProps = ({
  movies: {
    quizResults: {
      tmdbIDs: quizResults,
      currentIndex,
    },
  },
}) => ({
  quizResults,
  resultsLength: quizResults.length,
  currentIndex,
});

const mapDispatchToProps = (dispatch) => ({
  updateResultsIndex: () => dispatch(updateQuizResultIndex()),
  onResetQuizz: () => {
    dispatch(quizInit());
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(MovieButtons);
