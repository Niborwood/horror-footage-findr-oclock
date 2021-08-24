/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

// SCSS
import './Quiz.scss';

// ACTIONS FROM REDUX
import { chooseAnAnswser, switchToNextQuestion } from '../../actions/quiz';

// COMPONENT IMPORTS
import Button from '../Button';
import Divider from '../Divider';

// QUIZ COMPONENT
export const Quiz = ({
  question, answers, onClickAnswer, onClickNextQuestion,
}) => (
  <div className="quiz">
    <div className="quiz__question">{question}</div>
    <div className="quiz__answers">
      { answers.map((answer) => (
        <Button
          key={answer.value}
          textContent={answer.value}
          onClick={onClickAnswer}
          type="button"
          className="quiz__answers-item"
          value={answer.value}
        >
          {answer.value}
        </Button>
      )) }
    </div>
    <Divider />
    <div className="quiz__next-question">
      <a onClick={onClickNextQuestion} type="button">Question suivante</a>
    </div>
  </div>
);

Quiz.propTypes = {
  question: PropTypes.string.isRequired,
  answers: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.string.isRequired,
      selected: PropTypes.bool.isRequired,
    }),
  ).isRequired,
  onClickAnswer: PropTypes.func.isRequired,
  onClickNextQuestion: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  question: state.quiz.questions[state.quiz.currentQuestion],
  answers: state.quiz.currentAnswers,
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
