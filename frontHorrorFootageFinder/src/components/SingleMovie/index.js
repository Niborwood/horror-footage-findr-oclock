import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { useParams } from 'react-router-dom';

import Divider from '../Divider';
import MovieInfo from '../MovieInfo';
import MovieProviders from '../MovieProviders';
import MovieResults from '../MovieResults';

import './singlemovie.scss';

export const SingleMovie = ({ format, movieID }) => {
  // On récupère l'id du film soit :
  // - à partir de la route /movie/{id} (résultat de recherche)
  // On le parse pour qu'il soit un nombre et qu'on puisse valider
  // - à partir de la variable movieID (watchlist, homepage)
  // Dans les prop-types, le movieID est par défaut à null pour qu'il n'y ait pas d'erreur
  // de validation s'il n'est pas indiqué (cas id en params de la route)
  let paramMovieID;
  if (useParams().id) {
    const { id } = useParams();
    paramMovieID = parseInt(id, 10);
  }
  const tmdbID = movieID || paramMovieID;

  // On fait des rendus en fonction de la taille spécifiée dans le format
  // Si format = small, on fait un rendu compact -> juste MovieInfo sans les boutons de quiz
  // Si format = mini, on fait un rendu mini -> juste MovieInfo sans le résumé i les boutons de quiz
  // Si format = full (par défaut si pas de format spécifié), on fait un rendu complet
  return (
    <div className="single-movie">
      <MovieInfo movieID={tmdbID} format={format} />
      { format === 'full' && (
      <>
        <Divider />
        <MovieProviders movieID={tmdbID} />
        <Divider />
        <MovieResults />
      </>
      )}
    </div>
  );
};
SingleMovie.propTypes = {
  format: PropTypes.string,
  movieID: PropTypes.number,
};

SingleMovie.defaultProps = {
  format: 'full',
  movieID: null,
};

const mapStateToProps = () => ({
});

const mapDispatchToProps = () => ({

});

export default connect(mapStateToProps, mapDispatchToProps)(SingleMovie);
