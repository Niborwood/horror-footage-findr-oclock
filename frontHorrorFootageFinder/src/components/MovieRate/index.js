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
    color: '#b73232',
  },
  iconEmpty: {
    color: '#A9A9A9',
  },
})(Rating);

export const MovieRate = ({ onRateMovie, movieID, userRating }) => (
  <Box component="fieldset" mb={3} borderColor="transparent">
    {/* <Typography component="legend">Custom empty icon</Typography> */}
    <StyledRating
      name={`rate-${movieID}`}
      value={userRating}
      precision={0.5}
      onChange={(event) => {
        onRateMovie(event.target.value, movieID);
      }}
      emptyIcon={<StarBorderIcon fontSize="inherit" />}
    />
  </Box>
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
