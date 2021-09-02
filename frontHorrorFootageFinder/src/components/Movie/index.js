import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { useParams, NavLink } from 'react-router-dom';

import MovieInfo from '../MovieInfo';
import Header from '../Header';
import Footer from '../Footer';

import './movie.scss';

export const Movie = ({
  format, movieID,
}) => {
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
    <>
      { format === 'full' && <Header /> }
      <div className="single-movie">
        { format === 'full' ? <MovieInfo movieID={tmdbID} format={format} /> : <NavLink to={`/movie/${movieID}`}><MovieInfo movieID={tmdbID} format={format} /></NavLink> }
      </div>
      { format === 'full' && <Footer />}
    </>
  );
};
Movie.propTypes = {
  // FROM PARENT
  format: PropTypes.string,
  movieID: PropTypes.number,
};

Movie.defaultProps = {
  format: 'full',
  movieID: null,
};

const mapStateToProps = () => ({
});

const mapDispatchToProps = () => ({
});

export default connect(mapStateToProps, mapDispatchToProps)(Movie);
