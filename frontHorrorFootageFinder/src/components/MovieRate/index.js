import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Rating from '@material-ui/lab/Rating';
import StarBorderIcon from '@material-ui/icons/StarBorder';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

import {
  rateMovie,
} from '../../actions/rating';

const StyledRating = withStyles({
  iconFilled: {
    color: '#a50000',
  },
  iconHover: {
    color: '#a50000',
  },
  iconEmpty: {
    color: '#A9A9A9',
  },
})(Rating);

export const MovieRate = ({ onRateMovie, movieID }) => (
  <Box component="fieldset" mb={3} borderColor="transparent">
    <Typography component="legend">Custom empty icon</Typography>
    <StyledRating
      name="half-rating"
      value={2.5}
      precision={0.5}
      onChange={(event) => onRateMovie(event.target.value, movieID)}
      emptyIcon={<StarBorderIcon fontSize="inherit" />}
    />
  </Box>
);

MovieRate.propTypes = {
  onRateMovie: PropTypes.func.isRequired,
  movieID: PropTypes.number.isRequired,
};

const mapStateToProps = (state) => ({
});

const mapDispatchToProps = (dispatch) => ({
  onRateMovie: (value, movieID) => {
    dispatch(rateMovie(value, movieID));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(MovieRate);
