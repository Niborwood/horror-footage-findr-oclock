import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Rating from '@material-ui/lab/Rating';

import {
  rateMovie,
} from '../../actions/rating';

export const MovieRate = ({ onRateMovie, movieID }) => (
  <Rating
    name="half-rating"
    defaultValue={2.5}
    precision={0.5}
    onChange={(event) => onRateMovie(event.target.value, movieID)}
  />
);

MovieRate.propTypes = {
  onRateMovie: PropTypes.func.isRequired,
  movieID: PropTypes.number.isRequired,
};

const mapStateToProps = (state) => ({
});

const mapDispatchToProps = (dispatch) => ({
  onRateMovie: (value, movieID) => {
    console.log('component', value);
    dispatch(rateMovie(value, movieID));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(MovieRate);
