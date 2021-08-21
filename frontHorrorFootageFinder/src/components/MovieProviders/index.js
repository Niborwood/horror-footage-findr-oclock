import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { fetchMovieProviders } from '../../actions';
import mapProviders from '../../utils/mapProviders';

import './movieprovider.scss';

export const MovieProviders = ({
  movieID, getCurrentMovieProviders, ui,
}) => {
  // On récupère les providers du film à partir de l'API TMDB
  useEffect(() => {
    getCurrentMovieProviders(movieID);
  }, [movieID]);

  // On empêche l'effet de bord si les datas du film
  // ne sont pas encore récupérées : si les datas d'un film sont vides, on retourne le loading.
  // Le ?. est là pour vérifier les données spécifiques (data ou providers)
  // sans faire planter l'application si elles sont undefined.
  if (!ui[movieID]?.providers) {
    return <div className="loading-container">Loading...</div>;
  }

  // On récupère les providers du film à partir du state
  // suivant l'ID du film. Par exemple, un film avec l'ID 123
  // sera récupéré à partir du state : state.movie.123.providers
  // Le currentMovie n'est jamais un objet vide, car s'il l'est, on returne le Loading ci-dessus.
  const currentMovieProviders = ui[movieID].providers;

  // On mappe chacun des différents providers (Streaming, Location) pour leur affichage.
  // La fonction est factorisée dans utils/mapProviders
  const rentProviders = mapProviders(currentMovieProviders?.rent);
  const streamProviders = mapProviders(currentMovieProviders.flatrate);

  // Si
  if (Object.keys(currentMovieProviders).length === 1) {
    return (
      <div className="movie-providers">
        <div className="movie-providers-title">
          Aucune méthode de streaming disponible pour ce film.
        </div>
      </div>
    );
  }

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
  currentMovieProviders: PropTypes.shape({
    loaded: PropTypes.bool.isRequired,
    flatrate: PropTypes.arrayOf(PropTypes.shape),
    rent: PropTypes.arrayOf(PropTypes.shape),
    buy: PropTypes.arrayOf(PropTypes.shape),
  }).isRequired,
  getCurrentMovieProviders: PropTypes.func.isRequired,
  //! Pas trouvé comment vérifier un prop-type sur une propriété dynamique, donc :
  // eslint-disable-next-line react/forbid-prop-types
  ui: PropTypes.object.isRequired,
};

const mapStateToProps = ({ ui }) => ({
  ui,
});

const mapDispatchToProps = (dispatch) => ({
  getCurrentMovieProviders: (movieID) => {
    dispatch(fetchMovieProviders(movieID));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(MovieProviders);
