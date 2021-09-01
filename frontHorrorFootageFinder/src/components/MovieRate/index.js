import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Rating from '@material-ui/lab/Rating';
import StarBorderIcon from '@material-ui/icons/StarBorder';
import { withStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import {
  addMovieInWatched,
} from '../../actions/watchlist';

import {
  rateMovie,
} from '../../actions/rating';

const StyledRating = withStyles({
  iconFilled: {
    color: '#a50000',
  },
  iconHover: {
    color: '#b73232',
  },
  iconEmpty: {
    color: '#A9A9A9',
  },
})(Rating);

export const MovieRate = ({
  onRateMovie,
  movieID,
  userRating,
  handleAddMovieInWatched,
}) => (
  <Box component="fieldset" mb={3} borderColor="transparent">
    <StyledRating
      name={`rate-${movieID}`}
      value={userRating}
      precision={0.5}
      onChange={(event) => {
        onRateMovie(event.target.value, movieID);
        handleAddMovieInWatched(movieID);
      }}
      emptyIcon={<StarBorderIcon fontSize="inherit" />}
    />
  </Box>
);

MovieRate.propTypes = {
  onRateMovie: PropTypes.func.isRequired,
  movieID: PropTypes.number.isRequired,
  userRating: PropTypes.number,
  handleAddMovieInWatched: PropTypes.func.isRequired,
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
  handleAddMovieInWatched: (newWatchedId) => {
    const action = addMovieInWatched(newWatchedId);
    dispatch(action);
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(MovieRate);
