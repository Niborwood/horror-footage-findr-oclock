import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import './Quiz.scss';

import { chooseAnAnswser, switchToNextQuestion } from '../../actions';

export const Quiz = ({
  question, answers, onClickAnswer, onClickNextQuestion,
}) => (
  <div className="quiz">
    <div className="quiz-question">{question}</div>
    <div className="quiz-answers">
      { answers.map((answer) => (
        <button
          key={answer.value}
          onClick={onClickAnswer}
          type="button"
          className="quiz-answers-item"
          value={answer.value}
        >
          {answer.value}
        </button>
      )) }
    </div>
    <div className="quiz-next-question">
      <button onClick={onClickNextQuestion} type="button">Question suivante</button>
    </div>
  </div>
);

Quiz.propTypes = {
  question: PropTypes.string.isRequired,
  answers: PropTypes.arrayOf.isRequired,
  onClickAnswer: PropTypes.func.isRequired,
  onClickNextQuestion: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  question: state.questions[state.currentQuestion],
  answers: state.currentAnswers,
});

const mapDispatchToProps = (dispatch) => ({
  onClickAnswer: (event) => {
    dispatch(chooseAnAnswser(event.target.value));
  },
  onClickNextQuestion: () => {
    dispatch(switchToNextQuestion());
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Quiz);