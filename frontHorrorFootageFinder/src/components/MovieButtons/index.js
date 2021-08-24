import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Button from '../Button';

import './moviebuttons.scss';

import { resetQuiz } from '../../actions/quiz';

export const MovieButtons = ({ format, onResetQuizz }) => (
  <div className="movie-buttons">
    <Button textContent="Déjà vu" />
    <Button textContent="Ajouter à ma liste" />
    {/* Affichage conditionnel si le format = full seulement */}
    {format === 'full' && (
      <>
        <Button textContent="Autre résultat" />
        <Button to="/quiz" textContent="Relancer le quiz" onClick={onResetQuizz} />
      </>
    )}
  </div>
);

MovieButtons.propTypes = {
  format: PropTypes.string.isRequired,
  onResetQuizz: PropTypes.string.isRequired,
};

const mapStateToProps = () => ({

});

const mapDispatchToProps = (dispatch) => ({
  onResetQuizz: () => {
    dispatch(resetQuiz());
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(MovieButtons);
