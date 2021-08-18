import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { useParams } from 'react-router-dom';

import Loading from '../Loading';
import Divider from '../Divider';
import MovieInfo from '../MovieInfo';
import './singlemovie.scss';

export const SingleMovie = ({
  loading,
}) => {
  // On récupère l'id du film à partir de la route
  const { id: movieID } = useParams();

  return (
    <div className="single-movie">
      <MovieInfo movieID={parseInt(movieID, 10)} />
      <Divider />
    </div>

  );
};

SingleMovie.propTypes = {
  loading: PropTypes.bool.isRequired,
};

const mapStateToProps = ({ ui: { loading } }) => ({
  loading,
});

const mapDispatchToProps = () => ({

});

export default connect(mapStateToProps, mapDispatchToProps)(SingleMovie);
