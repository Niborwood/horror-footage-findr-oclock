import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { chooseAnAnswser } from '../../actions';

export const Quiz = ({ question, answers, onClickAnswer }) => (
  <div className="quiz">
    <div className="quiz-question">{question}</div>
    { answers.map((answer) => <button key={answer} onClick={onClickAnswer} type="button" className="quiz-answer" value={answer}>{answer}</button>) }
  </div>
);

Quiz.propTypes = {
  question: PropTypes.string.isRequired,
  answers: PropTypes.arrayOf.isRequired,
  onClickAnswer: PropTypes.func.isRequired,
};

const mapStateToProps = () => ({

});

const mapDispatchToProps = (dispatch) => ({
  onClickAnswer: (event) => {
    dispatch(chooseAnAnswser(event.target.value));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Quiz);
