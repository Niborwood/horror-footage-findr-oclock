import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { fetchMovie } from '../../actions/movies';
import mapProviders from '../../utils/mapProviders';

import './movieprovider.scss';

export const MovieProviders = ({
  movieID, getMovieProviders, movies,
}) => {
  // On récupère les providers du film à partir de l'API TMDB
  useEffect(() => {
    getMovieProviders(movieID);
  }, [movieID]);

  // On empêche l'effet de bord si les datas du film
  // ne sont pas encore récupérées : si les datas d'un film sont vides, on retourne le loading.
  // Le ?. est là pour vérifier les données spécifiques (data ou providers)
  // sans faire planter l'application si elles sont undefined.
  if (!movies[movieID]?.providers) {
    return <div className="loading-container">Loading...</div>;
  }

  // On récupère les providers du film à partir du state
  // suivant l'ID du film. Par exemple, un film avec l'ID 123
  // sera récupéré à partir du state : state.movie.123.providers
  // Le currentMovie n'est jamais un objet vide, car s'il l'est, on returne le Loading ci-dessus.
  const currentMovieProviders = movies[movieID].providers;

  // Si l'objet des providers est vide, on retourne un message général.
  if (Object.keys(currentMovieProviders).length === 0) {
    return (
      <div className="movie-providers">
        <h3 className="movie-providers__title">
          Aucune méthode de streaming disponible pour ce film.
        </h3>
      </div>
    );
  }

  // On mappe chacun des différents providers (Streaming, Location) pour leur affichage.
  // La fonction est factorisée dans utils/mapProviders
  const rentProviders = mapProviders(currentMovieProviders.rent);
  const streamProviders = mapProviders(currentMovieProviders.flatrate);

  // Si tout va bien, on affiche les différents providers
  return (
    <div className="movie-providers">
      <div className="movie-providers__part">
        <h3 className="movie-providers__title">SVOD</h3>
        <div className="movie-providers__list">
          {streamProviders || 'Non disponible en SVOD'}
        </div>
      </div>
      <div className="movie-providers__part">
        <h3 className="movie-providers__title">VOD</h3>
        <div className="movie-providers__list">
          {rentProviders || 'Non disponible en VOD'}
        </div>
      </div>
    </div>
  );
};

MovieProviders.propTypes = {
  // FROM PARENT
  movieID: PropTypes.number.isRequired,
  // FROM REDUX STATE
  getMovieProviders: PropTypes.func.isRequired,
  //! Pas trouvé comment vérifier un prop-type sur une propriété dynamique, donc :
  // eslint-disable-next-line react/forbid-prop-types
  movies: PropTypes.object.isRequired,
};

const mapStateToProps = ({ movies }) => ({
  movies,
});

const mapDispatchToProps = (dispatch) => ({
  getMovieProviders: (movieID) => {
    dispatch(fetchMovie(movieID, 'providers'));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(MovieProviders);
