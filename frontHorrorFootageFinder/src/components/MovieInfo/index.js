import React, { useEffect } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { useParams } from 'react-router-dom';
import { setCurrentMovieData } from '../../actions';

export const MovieInfo = ({ getCurrentMovieData, currentMovie }) => {
  // On récupère l'id du film à partir de la route
  const { id: movieID } = useParams();
  const apiKey = process.env.REACT_APP_TMDB_API_KEY;

  // On récupère le film à partir de l'API
  useEffect(() => {
    axios.get(`https://api.themoviedb.org/3/movie/${movieID}?api_key=${apiKey}&language=fr-FR`)
      .then((response) => {
        getCurrentMovieData(response.data);
      })
      .catch((error) => {
        console.dir(error);
      });
  }, []);
  return (
    <div className="movieInfo">
      Résumé :
      {' '}
      {currentMovie.overview}
    </div>
  );
};

MovieInfo.propTypes = {
  currentMovie: PropTypes.shape({
    original_title: PropTypes.string,
    overview: PropTypes.string,
    release_date: PropTypes.string,
    vote_average: PropTypes.number,
    belongs_to_collection: PropTypes.string,
    poster_path: PropTypes.string,
  }).isRequired,
  getCurrentMovieData: PropTypes.func.isRequired,
};

const mapStateToProps = ({ ui: { currentMovie } }) => ({
  currentMovie,
});

const mapDispatchToProps = (dispatch) => ({
  getCurrentMovieData: (currentMovieData) => {
    dispatch(setCurrentMovieData(currentMovieData));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(MovieInfo);
