import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { fetchMovie, fetchMovieTags } from '../../actions/movies';

import MovieButtons from '../MovieButtons';

import './movieinfo.scss';

export const MovieInfo = ({
  movieID, getMovie, format, getMovieTags,
  currentData, currentTags,
}) => {
  // On récupère le film à partir de l'API
  useEffect(() => {
    // On évite de relancer la requête si le film est déjà dans le store
    if (!currentData) {
      getMovie(movieID);
    }
    if (!currentTags) {
      getMovieTags(movieID);
    }
  }, [movieID]);

  // On empêche l'effet de bord si les datas du film
  // ne sont pas encore récupérées : si les datas d'un film sont vides, on retourne le loading.
  if (!currentData || !currentTags) {
    return <div className="loading-container">Loading...</div>;
  }

  // On récupère les informations du film à partir du state
  // suivant l'ID du film. Par exemple, un film avec l'ID 123
  // sera récupéré à partir du state : state.movie.123.data
  // Le currentMovie n'est jamais un objet vide, car s'il l'est, on returne le Loading ci-dessus.

  if (format === 'mini') {
    return (
      <div className="movie-info">
        <div className="movie-info__left-side">
          <img className="movie-info__poster" src={`https://www.themoviedb.org/t/p/w300/${currentData.poster_path}`} alt={`${currentData.original_title} movie poster`} title={`${currentData.original_title} movie poster`} />
          <div className="movie-info__tags">
            {currentTags}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="movie-info">
      {/* LEFT SIDE */}
      <div className="movie-info__left-side">
        <img className="movie-info__poster" src={`https://www.themoviedb.org/t/p/w300/${currentData.poster_path}`} alt={`${currentData.original_title} movie poster`} title={`${currentData.original_title} movie poster`} />
        <div className="movie-info__tags">
          {currentTags}
        </div>
      </div>

      {/* RIGHT SIDE */}
      <div className="movie-info__right-side">
        <div className="movie-info__title">
          {currentData.original_title}
          {' '}
          -
          {' '}
          {currentData.release_date.slice(0, 4)}
        </div>
        <div className="movie-info__rating">
          Note HFF : 4.3/5
          <br />
          Note TMDB :
          {' '}
          {currentData.vote_average / 2}
          /5
        </div>
        {/* On passe le format à MovieButtons pour qu'il affiche ou non les deux boutons de quiz */}
        <MovieButtons format={format} />

        {/* Affichage conditionnel de la collection si le film en possède une */}
        {currentData.belongs_to_collection
            && (
            <div className="movie-info__collection">
              Collection :
              {' '}
              {currentData.belongs_to_collection.name}
            </div>
            )}
        {/* Affichage conditionnel de la description si le format est full */}
        {format === 'full' && (
        <div className="movie-info__description">
          {currentData.overview}
        </div>
        )}
      </div>
    </div>
  );
};

MovieInfo.propTypes = {
  movieID: PropTypes.number.isRequired,
  getMovie: PropTypes.func.isRequired,
  format: PropTypes.string.isRequired,
  currentData: PropTypes.shape({
    poster_path: PropTypes.string,
    original_title: PropTypes.string,
    release_date: PropTypes.string,
    overview: PropTypes.string,
    vote_average: PropTypes.number,
    belongs_to_collection: PropTypes.shape({
      name: PropTypes.string,
    }),
  }),
  currentTags: PropTypes.string,
  getMovieTags: PropTypes.func.isRequired,
};

MovieInfo.defaultProps = {
  currentData: null,
  currentTags: null,
};

const mapStateToProps = ({ movies }, { movieID }) => ({
  // Le "?" est indispensable pour éviter une erreur au premier rendu du composant (pas de data)
  currentData: movies[movieID]?.data,
  // L'API nous retourne un array de tags : on le transforme en une string séparée par des ","
  currentTags: movies[movieID]?.tags?.join(', '),
});

const mapDispatchToProps = (dispatch) => ({
  getMovie: (movieID) => {
    dispatch(fetchMovie(movieID, 'data'));
  },
  getMovieTags: (movieID) => {
    dispatch(fetchMovieTags(movieID));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(MovieInfo);
