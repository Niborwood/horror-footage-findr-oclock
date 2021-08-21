import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { fetchMovieData } from '../../actions';

import MovieButtons from '../MovieButtons';

import './movieinfo.scss';

export const MovieInfo = ({
  movieID, getMovieData, format, ui,
}) => {
  // On récupère le film à partir de l'API
  useEffect(() => {
    getMovieData(movieID);
  }, [movieID]);

  // On empêche l'effet de bord si les datas du film
  // ne sont pas encore récupérées : si les datas d'un film sont vides, on retourne le loading.
  // Le ?. est là pour vérifier les données spécifiques (data ou providers)
  // sans faire planter l'application si elles sont undefined.
  //! Si bug d'affichage, on peut tester la condition : !ui[movieID]?.data.loaded
  if (!ui[movieID]?.data) {
    return <div className="loading-container">Loading...</div>;
  }

  // On récupère les informations du film à partir du state
  // suivant l'ID du film. Par exemple, un film avec l'ID 123
  // sera récupéré à partir du state : state.movie.123.data
  // Le currentMovie n'est jamais un objet vide, car s'il l'est, on returne le Loading ci-dessus.
  const currentMovie = ui[movieID].data;

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
  movieID: PropTypes.number.isRequired,
  getMovieData: PropTypes.func.isRequired,
  format: PropTypes.string.isRequired,
  //! Pas trouvé comment vérifier un prop-type sur une propriété dynamique, donc :
  // eslint-disable-next-line react/forbid-prop-types
  ui: PropTypes.object.isRequired,
};

const mapStateToProps = ({ ui }) => ({
  ui,
});

const mapDispatchToProps = (dispatch) => ({
  getMovieData: (movieID) => {
    dispatch(fetchMovieData(movieID));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(MovieInfo);
