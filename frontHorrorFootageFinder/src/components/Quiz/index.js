import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { chooseAnAnswser, switchToNextQuestion } from '../../actions';

export const Quiz = ({
  question, answers, onClickAnswer, onClickNextQuestion,
}) => (
  <div className="quiz">
    <div className="quiz-question">{question}</div>
    { answers.map((answer) => <button key={answer} onClick={onClickAnswer} type="button" className="quiz-answer" value={answer}>{answer}</button>) }
    <div>
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
  answers: state.answers,
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
