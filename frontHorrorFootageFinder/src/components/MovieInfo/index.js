import React, { useEffect } from 'react';
import axios from 'axios';

import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { setCurrentMovieData, toggleLoading } from '../../actions';

import './movieinfo.scss';

export const MovieInfo = ({
  movieID, currentMovie, getCurrentMovieData, toggleLoad,
}) => {
  const apiKey = process.env.REACT_APP_TMDB_API_KEY;

  // On récupère le film à partir de l'API
  useEffect(() => {
    toggleLoad();
    axios.get(`https://api.themoviedb.org/3/movie/${movieID}?api_key=${apiKey}&language=fr-FR`)
      .then((response) => {
        getCurrentMovieData(response.data);
      })
      .catch((error) => {
        console.dir(error);
      })
      .finally(() => {
        toggleLoad();
      });
  }, []);

  return (
    <div className="movie-info">
      <div className="movie-info__left-side">
        <img className="movie-info__poster" src={`https://www.themoviedb.org/t/p/w300/${currentMovie.poster_path}`} alt={`${currentMovie.original_title} movie poster`} title={`${currentMovie.original_title} movie poster`} />
      </div>
      <div className="movie-info__right-side">

        <div className="movie-info__tags">
          00S, COMMON, EUROPE, MOCKUMENTARY, MONSTERS
        </div>
        <div className="movie-info__title">
          {currentMovie.original_title}
          {' '}
          -
          {' '}
          {currentMovie.release_date?.slice(0, 4)}
        </div>
        <div className="movie-info__rating">
          Notes du site : 4.3/5
          <br />
          Note TMDB :
          {' '}
          {currentMovie.vote_average / 2}
          /5
        </div>
        {/* Affichage conditionnel de la collection si le film en possède une */}
        {currentMovie.belongs_to_collection
            && (
            <div className="movie-info__collection">
              Collection :
              {' '}
              {currentMovie.belongs_to_collection.name}
            </div>
            )}
        <div className="movie-info__description">
          {currentMovie.overview}
        </div>
      </div>
    </div>
  );
};

MovieInfo.propTypes = {
  currentMovie: PropTypes.shape({
    original_title: PropTypes.string,
    overview: PropTypes.string,
    release_date: PropTypes.string,
    vote_average: PropTypes.number,
    belongs_to_collection: PropTypes.shape({
      name: PropTypes.string,
    }),
    poster_path: PropTypes.string,
  }).isRequired,
  movieID: PropTypes.number.isRequired,
  getCurrentMovieData: PropTypes.func.isRequired,
  toggleLoad: PropTypes.func.isRequired,
};

const mapStateToProps = ({ ui: { currentMovie } }) => ({
  currentMovie,
});

const mapDispatchToProps = (dispatch) => ({
  getCurrentMovieData: (currentMovieData) => {
    dispatch(setCurrentMovieData(currentMovieData));
  },
  toggleLoad: () => {
    dispatch(toggleLoading());
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(MovieInfo);
