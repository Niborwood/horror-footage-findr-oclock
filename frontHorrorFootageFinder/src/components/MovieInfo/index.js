import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { fetchMovie, fetchMovieIntData } from '../../actions/movies';
import { fetchUserRatingOnSingleMovie } from '../../actions/rating';

import MovieButtons from '../MovieButtons';
import MovieRate from '../MovieRate';
import Divider from '../Divider';
import MovieProviders from '../MovieProviders';

import './movieinfo.scss';

export const MovieInfo = ({
  movieID, getMovie, format, getMovieIntData,
  currentData, currentTags, isLogged, hffRating, userID, getUserRatingOnSingleMovie,
}) => {
  // On check si le film est une série ou non (bool)
  const isSeries = currentTags?.includes('series');

  // On récupère le film à partir de l'API
  useEffect(() => {
    // Appel API
    if (!currentTags) {
      getMovieIntData(movieID);
    }
    // On évite de relancer la requête si le film est déjà dans le store
    // On envoie si c'est une série
    // Appel TMDB
    if (!currentData && isSeries !== undefined) {
      getMovie(movieID, isSeries);
    }

    if (isLogged) {
      getUserRatingOnSingleMovie(userID, movieID);
    }
  }, [movieID, currentTags]);

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
          <div>
            {isLogged && <MovieRate movieID={movieID} />}
          </div>
          <div className="movie-info__tags">
            {currentTags}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`movie-info ${format === 'full' && 'movie-info__full'}`}>
      {/* LEFT SIDE */}
      <div className="movie-info__left-side">
        <img className="movie-info__poster" src={`https://www.themoviedb.org/t/p/w300/${currentData.poster_path}`} alt={`${currentData.original_title} movie poster`} title={`${currentData.original_title} movie poster`} />
        <div>
          {isLogged && <MovieRate movieID={movieID} />}
        </div>
        <div className="movie-info__tags">
          {currentTags}
        </div>
      </div>

      {/* RIGHT SIDE */}
      <div className="movie-info__right-side">
        <div className="movie-info__title">
          {isSeries ? currentData.original_name : currentData.original_title}
          {' '}
          -
          {' '}
          {isSeries ? currentData.first_air_date.slice(0, 4) : currentData.release_date.slice(0, 4)}
        </div>
        <div className="movie-info__rating">
          {hffRating && (
            <>
              Note HFF :
              {' '}
              {parseFloat(hffRating).toFixed(1)}
              /5
              <br />
            </>
          )}

          Note TMDB :
          {' '}
          {(currentData.vote_average / 2).toFixed(1)}
          /5
        </div>
        {/* On passe le format à MovieButtons pour qu'il affiche ou non les deux boutons de quiz */}
        <MovieButtons format={format} movieID={movieID} />
        <Divider />

        {/* Affichage conditionnel de la description si le format est full */}
        {format === 'full' && (
          <>
            <div className="movie-info__description">
              {/* Affichage conditionnel de la collection si le film en possède une */}
              {currentData.belongs_to_collection
              && (
                <div className="movie-info__collection">
                  Collection :
                  {' '}
                  {currentData.belongs_to_collection.name}
                </div>
              )}
              {currentData.overview}
            </div>
            <Divider />
            <MovieProviders movieID={movieID} />
          </>
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
    original_name: PropTypes.string,
    release_date: PropTypes.string,
    overview: PropTypes.string,
    first_air_date: PropTypes.string,
    vote_average: PropTypes.number,
    belongs_to_collection: PropTypes.shape({
      name: PropTypes.string,
    }),
  }),
  currentTags: PropTypes.string,
  getMovieIntData: PropTypes.func.isRequired,
  hffRating: PropTypes.number,
  isLogged: PropTypes.bool.isRequired,
  userID: PropTypes.number.isRequired,
  getUserRatingOnSingleMovie: PropTypes.func.isRequired,
};

MovieInfo.defaultProps = {
  currentData: null,
  currentTags: null,
  hffRating: null,
};

const mapStateToProps = ({ movies, login: { id, isLogged } }, { movieID }) => ({
  // Le "?" est indispensable pour éviter une erreur au premier rendu du composant (pas de data)
  currentData: movies[movieID]?.data,
  // L'API nous retourne un array de tags : on le transforme en une string séparée par des ","
  currentTags: movies[movieID]?.tags?.join(', '),
  hffRating: movies[movieID]?.hffRating,
  isLogged,
  userID: id,
});

const mapDispatchToProps = (dispatch) => ({
  getMovie: (movieID, isSeries) => {
    dispatch(fetchMovie(movieID, 'data', isSeries));
  },
  getMovieIntData: (movieID) => {
    dispatch(fetchMovieIntData(movieID));
  },
  getUserRatingOnSingleMovie: (userID, movieID) => {
    dispatch(fetchUserRatingOnSingleMovie(userID, movieID));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(MovieInfo);
