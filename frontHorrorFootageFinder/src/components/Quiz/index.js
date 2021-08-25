/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

// SCSS
import './Quiz.scss';

// ACTIONS FROM REDUX
import {
  chooseAnAnswser, switchToNextQuestion,
  loadQuestionAndAnswers, loadQuestionsNumber,
} from '../../actions/quiz';

// COMPONENT IMPORTS
import Button from '../Button';
import Divider from '../Divider';

// QUIZ COMPONENT
export const Quiz = ({
  question, onClickAnswer, onClickNextQuestion,
  currentQuestion, currentAnswers, savedAnswers, getQuestionAndAnswers,
  getNumberOfQuestions,
}) => {
  // A chaque fois que la question change, on relance une requête à l'API
  // qui nous retourne les réponses/tags en fonction des filtres précédents
  useEffect(() => {
    // Si la currentQuestion est la première,
    // on fait enregistre le nombre de questions dans le state
    if (currentQuestion === 1) {
      getNumberOfQuestions();
    }
    getQuestionAndAnswers(currentQuestion, savedAnswers);
  }, [currentQuestion]);

  // Si la question ne contient qu'une seule réponse, c'est qu'elle n'a pas besoin
  // d'être posée : on peut directement passer à la prochaine question
  if (currentAnswers.length === 1) {
    onClickNextQuestion();
  }

  // On mappe sur les réponses de l'API pour leur donner forme avec le composant Button
  const answersList = currentAnswers.map((answer) => (
    <Button
      key={answer.id}
      onClick={() => onClickAnswer(answer.id)}
      className="quiz__answers-item"
      selected={answer.selected}
      textContent={answer.description}
      value={answer.value}
    />
  ));

  // On retourne les données traitées
  return (
    <div className="quiz">
      <div className="quiz__question">{question}</div>
      <div className="quiz__answers">
        {answersList}
      </div>
      <Divider />
      <div className="quiz__next-question">
        <a onClick={onClickNextQuestion} type="button">Question suivante</a>
      </div>
    </div>
  );
};

Quiz.propTypes = {
  question: PropTypes.string.isRequired,
  currentAnswers: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.string.isRequired,
      selected: PropTypes.bool.isRequired,
    }),
  ).isRequired,
  savedAnswers: PropTypes.arrayOf(
    PropTypes.string,
  ).isRequired,
  onClickAnswer: PropTypes.func.isRequired,
  onClickNextQuestion: PropTypes.func.isRequired,
  currentQuestion: PropTypes.number.isRequired,
  getQuestionAndAnswers: PropTypes.func.isRequired,
  getNumberOfQuestions: PropTypes.func.isRequired,
};

const mapStateToProps = (
  {
    quiz: {
      question, currentQuestion, currentAnswers, savedAnswers,
    },
  },
) => ({
  question,
  currentQuestion,
  currentAnswers,
  savedAnswers,
});

const mapDispatchToProps = (dispatch) => ({
  onClickAnswer: (answerID) => {
    //! On peut mieux faire avec mergeProps ?
    dispatch(chooseAnAnswser(answerID));
  },
  onClickNextQuestion: () => {
    dispatch(switchToNextQuestion());
  },
  getQuestionAndAnswers: (currentQuestion, savedAnswers) => {
    dispatch(loadQuestionAndAnswers(currentQuestion, savedAnswers));
  },
  getNumberOfQuestions: () => {
    dispatch(loadQuestionsNumber());
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Quiz);
