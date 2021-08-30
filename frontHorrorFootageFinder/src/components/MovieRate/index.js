import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Rating from '@material-ui/lab/Rating';

import {
  rateMovie,
} from '../../actions/rating';

export const MovieRate = ({ onRateMovie, movieID, userRating }) => (
  <Rating
    name="half-rating"
    value={userRating}
    precision={0.5}
    onChange={(event) => onRateMovie(event.target.value, movieID)}
  />
);

MovieRate.propTypes = {
  onRateMovie: PropTypes.func.isRequired,
  movieID: PropTypes.number.isRequired,
  userRating: PropTypes.number,
};

MovieRate.defaultProps = {
  userRating: 0,
};

const mapStateToProps = ({ movies }, { movieID }) => ({
  userRating: movies[movieID].userRating,
});

const mapDispatchToProps = (dispatch) => ({
  onRateMovie: (value, movieID) => {
    dispatch(rateMovie(value, movieID));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(MovieRate);
