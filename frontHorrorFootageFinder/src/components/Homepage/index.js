import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Button from '../Button';
import Carousel from '../Carousel';

import { getTopMovies } from '../../actions/movies';
import { checkToken } from '../../actions/login';
import './homepage.scss';

export const Homepage = ({ loadTopMovies, startCheckToken, topMovies: { loaded, tmdbIDs } }) => {
  // Appel à l'API interne pour récupérer les 3 films les plus populaires
  // selon les utilisateurs du site
  useEffect(() => {
    loadTopMovies(3);
    startCheckToken();
  }, []);

  // Gestion du bouton "Découvrir" pour le carousel de sélection
  const homepageCarousel = useRef(null);
  const scrollToHomepageCarousel = () => {
    homepageCarousel.current.scrollIntoView({
      behavior: 'smooth',
    });
  };

  if (!loaded) {
    return <div>Loading...</div>;
  }

  return (
    <div className="homepage">
      <div className="homepage__main">
        <h2 className="homepage__title">
          Votre tape n&apos;attend que vous.
        </h2>
        <p className="homepage__subtitle">
          En quelques questions,
          <br />
          Trouvez le found footage parfait à voir ce soir.
        </p>
        <Button to="/quiz" textContent="● Lancer le quiz ●" className="button-ui__launch" />

        <h2 className="homepage__title">
          Sélection
        </h2>
        <p className="homepage__subtitle">Découvrez les 3 films qui angoissent notre communauté</p>
        <Button onClick={scrollToHomepageCarousel} to="/#homepage-selection" textContent="Découvrir" />
      </div>

      <div id="home-carousel" ref={homepageCarousel}>
        <Carousel format="small" movies={tmdbIDs} />
      </div>
    </div>
  );
};

Homepage.propTypes = {
  loadTopMovies: PropTypes.func.isRequired,
  startCheckToken: PropTypes.func.isRequired,
  topMovies: PropTypes.shape({
    loaded: PropTypes.bool.isRequired,
    tmdbIDs: PropTypes.arrayOf(
      PropTypes.number,
    ),
  }).isRequired,
};

const mapStateToProps = ({ movies: { topMovies } }) => ({
  topMovies,
});

const mapDispatchToProps = (dispatch) => ({
  loadTopMovies: (movies) => {
    dispatch(getTopMovies(movies));
  },
  startCheckToken: () => {
    const action = checkToken();
    dispatch(action);
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Homepage);
