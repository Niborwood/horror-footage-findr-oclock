import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { fetchMovieProviders } from '../../actions';

export const MovieProviders = ({
  movieID, getCurrentMovieProviders, currentMovieProviders, loading,
}) => {
  // On récupère les providers du film à partir de l'API TMDB
  useEffect(() => {
    getCurrentMovieProviders(movieID);
  }, []);

  return (

    <div className="movie-providers">
      <div className="movie-providers__svod">
        <h3 className="movie-providers__title">SVOD - ABONNEMENT</h3>
        <div className="movie-providers__list">
          TEST
        </div>
      </div>
      <div className="movie-providers__vod">
        <h3 className="movie-providers__title">VOD - LOCATION/Achat</h3>
        <div className="movie-providers__list">
          {console.log(currentMovieProviders?.rent)}
        </div>
      </div>
    </div>
  );
};

MovieProviders.propTypes = {
  // FROM PARENT
  movieID: PropTypes.number.isRequired,
  // FROM REDUX STATE
  currentMovieProviders: PropTypes.shape({
    flatrate: PropTypes.arrayOf(PropTypes.shape),
    rent: PropTypes.arrayOf(PropTypes.shape),
    buy: PropTypes.arrayOf(PropTypes.shape),
  }).isRequired,
  getCurrentMovieProviders: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
};

const mapStateToProps = ({ ui: { currentMovieProviders, loading } }) => ({
  currentMovieProviders,
  loading,
});

const mapDispatchToProps = (dispatch) => ({
  getCurrentMovieProviders: (movieID) => {
    dispatch(fetchMovieProviders(movieID));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(MovieProviders);
