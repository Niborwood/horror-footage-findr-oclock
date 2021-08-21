import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Arrow from '../Arrow';
import SingleMovie from '../SingleMovie';

import './carousel.scss';

// Le Carousel peux prendre deux formats :
// - format="small", avec l'affiche, les tags, le titre, les notes et les boutons de vues
// - format="mini", seulement avec l'affiche
export const Carousel = ({ format }) => {
  // Fake data
  const ids = [186, 227, 221];
  const movies = ids.map((id) => (
    <div key={id} className="carousel__movie">
      <SingleMovie format={format} movieID={id} />
    </div>
  ));

  return (
    <div className="carousel">
      <div className="carousel__arrow-back">
        <Arrow type="rewind" size="md" />
      </div>
      <div className="carousel__list">
        {movies}
      </div>
      <div className="carousel__arrow-next">
        <Arrow type="forward" size="md" />
      </div>
    </div>
  );
};

Carousel.propTypes = {
  format: PropTypes.string,
};

Carousel.defaultProps = {
  format: 'small',
};

const mapStateToProps = () => ({

});

const mapDispatchToProps = {

};

export default connect(mapStateToProps, mapDispatchToProps)(Carousel);
