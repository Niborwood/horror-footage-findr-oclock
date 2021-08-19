import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { fetchMovieProviders } from '../../actions';
import mapProviders from '../../utils/mapProviders';

import './movieprovider.scss';

export const MovieProviders = ({
  movieID, getCurrentMovieProviders, currentMovieProviders,
}) => {
  // On récupère les providers du film à partir de l'API TMDB
  useEffect(() => {
    getCurrentMovieProviders(movieID);
  }, []);

  // On empêche l'effet de bord si les providers ne sont pas encore récupérés
  if (!currentMovieProviders.loaded) {
    return <div className="loading-container">Loading...</div>;
  }

  // On mappe chacun des différents providers (Streaming, Location) pour leur affichage.
  // La fonction est factorisée dans utils/mapProviders
  const rentProviders = mapProviders(currentMovieProviders.rent);
  const streamProviders = mapProviders(currentMovieProviders.flatrate);

  return (

    <div className="movie-providers">
      <div className="movie-providers__part">
        <h3 className="movie-providers__title">SVOD</h3>
        <div className="movie-providers__list">
          {streamProviders}
        </div>
      </div>
      <div className="movie-providers__part">
        <h3 className="movie-providers__title">VOD</h3>
        <div className="movie-providers__list">
          {rentProviders}
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
    loaded: PropTypes.bool.isRequired,
    flatrate: PropTypes.arrayOf(PropTypes.shape),
    rent: PropTypes.arrayOf(PropTypes.shape),
    buy: PropTypes.arrayOf(PropTypes.shape),
  }).isRequired,
  getCurrentMovieProviders: PropTypes.func.isRequired,
};

const mapStateToProps = ({ ui: { currentMovieProviders } }) => ({
  currentMovieProviders,
});

const mapDispatchToProps = (dispatch) => ({
  getCurrentMovieProviders: (movieID) => {
    dispatch(fetchMovieProviders(movieID));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(MovieProviders);
