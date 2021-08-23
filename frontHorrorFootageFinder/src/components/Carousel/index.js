import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Arrow from '../Arrow';
import Movie from '../Movie';

import './carousel.scss';

// Le Carousel peux prendre deux formats :
// - format="small", avec l'affiche, les tags, le titre, les notes et les boutons de vues
// - format="mini", seulement avec l'affiche
export const Carousel = ({ format, movies }) => {
  // On mappe la liste d'IDs TMDB reçus pour en afficher chaque composant Movie
  const movieList = movies.map((id) => (
    <div key={id} className="carousel__movie">
      <Movie format={format} movieID={id} />
    </div>
  ));

  return (
    <div className="carousel">
      <div className="carousel__arrow-back">
        <Arrow type="rewind" size="md" />
      </div>
      <div className="carousel__list">
        {movieList}
      </div>
      <div className="carousel__arrow-next">
        <Arrow type="forward" size="md" />
      </div>
    </div>
  );
};

Carousel.propTypes = {
  format: PropTypes.string,
  movies: PropTypes.arrayOf(
    PropTypes.number,
  ).isRequired,
};

Carousel.defaultProps = {
  format: 'small',
};

const mapStateToProps = () => ({

});

const mapDispatchToProps = {

};

export default connect(mapStateToProps, mapDispatchToProps)(Carousel);
