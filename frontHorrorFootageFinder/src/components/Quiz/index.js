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
  fetchQuestionAndAnswers, loadQuestionsNumber,
  fetchQuizResults,
} from '../../actions/quiz';

// COMPONENT IMPORTS
import Button from '../Button';
import Divider from '../Divider';

// QUIZ COMPONENT
export const Quiz = ({
  question, onClickAnswer, onClickNextQuestion,
  currentQuestion, currentAnswers, savedAnswers, getQuestionAndAnswers,
  getNumberOfQuestions, numberOfQuestions,
  numberOfAnswers, getQuizResults, quizCompleted, firstResult,
}) => {
  console.log(numberOfQuestions);
  // On charge le nombre de questions une fois
  useEffect(() => {
    getNumberOfQuestions();
  }, []);

  // A chaque fois que la question change, on relance une requête à l'API
  // qui nous retourne les réponses/tags en fonction des filtres précédents
  useEffect(() => {
    console.log('Question numéro :', currentQuestion);
    // Si la currentQuestion ne dépasse pas le nombre de questions,
    // on charge une question et ses réponses dans le state
    //! A retravailler, pour l'instant la condition ne passe
    //! que parce que le reducer de numberOfQuestions = 1...
    if (currentQuestion <= numberOfQuestions) {
      console.log('appel api');
      getQuestionAndAnswers(currentQuestion, savedAnswers);
    } else {
      getQuizResults(savedAnswers);
    }
  }, [currentQuestion, numberOfQuestions]);

  // Si la question ne contient qu'une seule réponse, c'est qu'elle n'a pas besoin
  // d'être posée : on peut directement passer à la prochaine question
  useEffect(() => {
    if (numberOfAnswers === 1) {
      console.log('question', currentQuestion, 'skipped !');
      onClickNextQuestion();
    }
  }, [numberOfAnswers]);

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

  // On retourne les données traitées, suivant que l'utilisateur ait complété
  // ou non le quiz (quizCompleted)
  return (
    <div className="quiz">
      <div className="quiz__question">{quizCompleted ? 'Votre found footage n\'attend que vous.' : question}</div>
      <div className="quiz__answers">
        {quizCompleted ? 'Cliquez sur le bouton pour voir le résultat.' : answersList}
      </div>
      <Divider />
      <div className="quiz__next-question">
        {quizCompleted ? (<Button to={`/movie/${firstResult}`} textContent="Découvrir" />) : (<a onClick={onClickNextQuestion} type="button">Question suivante</a>)}
      </div>
    </div>
  );
};

Quiz.propTypes = {
  // Question & Réponses
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
  // Données du quiz
  currentQuestion: PropTypes.number.isRequired,
  numberOfQuestions: PropTypes.number.isRequired,
  numberOfAnswers: PropTypes.number.isRequired,
  quizCompleted: PropTypes.bool.isRequired,
  firstResult: PropTypes.number,
  // Gestions des clics
  onClickAnswer: PropTypes.func.isRequired,
  onClickNextQuestion: PropTypes.func.isRequired,
  // Fonctions de dispatch
  getQuestionAndAnswers: PropTypes.func.isRequired,
  getNumberOfQuestions: PropTypes.func.isRequired,
  getQuizResults: PropTypes.func.isRequired,
};

Quiz.defaultProps = {
  firstResult: null,
};

const mapStateToProps = (
  {
    quiz: {
      question,
      currentQuestion,
      currentAnswers,
      savedAnswers,
      numberOfQuestions,
      numberOfAnswers,
      quizCompleted,
    },
    movies: {
      quizResults: [firstResult],
    },
  },
) => ({
  question,
  currentQuestion,
  currentAnswers,
  savedAnswers,
  numberOfQuestions,
  numberOfAnswers,
  quizCompleted,
  firstResult,
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
    dispatch(fetchQuestionAndAnswers(currentQuestion, savedAnswers));
  },
  getNumberOfQuestions: () => {
    dispatch(loadQuestionsNumber());
  },
  getQuizResults: (savedAnswers) => {
    // On transforme le tableau de réponses en une chaine de caractères
    const answers = savedAnswers.join(',');
    dispatch(fetchQuizResults(answers));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Quiz);
