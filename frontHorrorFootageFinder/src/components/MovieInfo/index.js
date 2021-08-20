import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { fetchMovieData } from '../../actions';

import MovieButtons from '../MovieButtons';

import './movieinfo.scss';

export const MovieInfo = ({
  movieID, currentMovie, getMovieData, format,
}) => {
  // On récupère le film à partir de l'API
  useEffect(() => {
    getMovieData(movieID);
  }, [movieID]);

  // On empêche l'effet de bord si les data du film
  // ne sont pas encore réupérés
  if (!currentMovie.loaded) {
    return <div className="loading-container">Loading...</div>;
  }

  return (
    <div className="movie-info">
      {/* LEFT SIDE */}
      <div className="movie-info__left-side">
        <img className="movie-info__poster" src={`https://www.themoviedb.org/t/p/w300/${currentMovie.poster_path}`} alt={`${currentMovie.original_title} movie poster`} title={`${currentMovie.original_title} movie poster`} />
        <div className="movie-info__tags">
          00S, COMMON, EUROPE, MOCKUMENTARY, MONSTERS
        </div>
      </div>

      {/* RIGHT SIDE */}
      <div className="movie-info__right-side">
        <div className="movie-info__title">
          {currentMovie.original_title}
          {' '}
          -
          {' '}
          {currentMovie.release_date.slice(0, 4)}
        </div>
        <div className="movie-info__rating">
          Note HFF : 4.3/5
          <br />
          Note TMDB :
          {' '}
          {currentMovie.vote_average / 2}
          /5
        </div>
        {/* On passe le format à MovieButtons pour qu'il affiche ou non les deux boutons de quiz */}
        <MovieButtons format={format} />

        {/* Affichage conditionnel de la collection si le film en possède une */}
        {currentMovie.belongs_to_collection
            && (
            <div className="movie-info__collection">
              Collection :
              {' '}
              {currentMovie.belongs_to_collection.name}
            </div>
            )}
        {/* Affichage conditionnel de la description si le format est full */}
        {format === 'full' && (
        <div className="movie-info__description">
          {currentMovie.overview}
        </div>
        )}
      </div>
    </div>
  );
};

MovieInfo.propTypes = {
  currentMovie: PropTypes.shape({
    loaded: PropTypes.bool.isRequired,
    original_title: PropTypes.string,
    overview: PropTypes.string,
    release_date: PropTypes.string,
    vote_average: PropTypes.number,
    belongs_to_collection: PropTypes.shape({
      name: PropTypes.string,
    }),
    poster_path: PropTypes.string,
  }).isRequired,
  movieID: PropTypes.number.isRequired,
  getMovieData: PropTypes.func.isRequired,
  format: PropTypes.string.isRequired,
};

const mapStateToProps = ({ ui: { currentMovie } }) => ({
  currentMovie,
});

const mapDispatchToProps = (dispatch) => ({
  getMovieData: (movieID) => {
    dispatch(fetchMovieData(movieID));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(MovieInfo);
