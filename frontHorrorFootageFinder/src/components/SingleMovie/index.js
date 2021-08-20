import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { useParams } from 'react-router-dom';

import Divider from '../Divider';
import MovieInfo from '../MovieInfo';
import MovieProviders from '../MovieProviders';
import MovieResults from '../MovieResults';

import './singlemovie.scss';

export const SingleMovie = ({ format }) => {
  // On récupère l'id du film à partir de la route
  // On le parse pour qu'il soit un nombre et qu'on puisse valider
  // sa prop-type dans les composants enfants
  let { id: movieID } = useParams();
  movieID = parseInt(movieID, 10);

  return (
    <div className="single-movie">
      <MovieInfo movieID={movieID} />
      <Divider />
      <MovieProviders movieID={movieID} />
      <Divider />
      <MovieResults />
    </div>

  );
};

SingleMovie.propTypes = {
  format: PropTypes.string,
};

SingleMovie.defaultProps = {
  format: 'full',
};

const mapStateToProps = () => ({
});

const mapDispatchToProps = () => ({

});

export default connect(mapStateToProps, mapDispatchToProps)(SingleMovie);
