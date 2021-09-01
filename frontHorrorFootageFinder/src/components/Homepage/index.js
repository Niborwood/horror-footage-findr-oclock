import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Button from '../Button';
import Carousel from '../Carousel';

import { getTopMovies } from '../../actions/movies';

import './homepage.scss';

export const Homepage = ({ loadTopMovies, topMovies: { loaded, tmdbIDs }, isLogged }) => {
  // Appel à l'API interne pour récupérer les 3 films les plus populaires
  // selon les utilisateurs du site

  useEffect(() => {
    loadTopMovies(3);
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
          Votre cassette n&apos;attend que vous.
        </h2>
        <p className="homepage__subtitle">
          En quelques questions,
          <br />
          Trouvez le found footage parfait à voir ce soir.
        </p>
        <Button to="/quiz" textContent="● Lancer le quiz ●" className="button-ui__launch" />

        <div className="homepage__login">
          <h2 className="homepage__title">
            Gérez votre filmothèque
          </h2>
          <p className="homepage__subtitle">Notez les films et marquez vos résultats comme vus ou à voir.</p>
          {isLogged ? (
            <Button to="/profile" textContent="Mon profil" />
          ) : (
            <Button to="/login" textContent="Se connecter" />
          )}
        </div>
      </div>

      <div id="home-carousel" ref={homepageCarousel}>
        <h2 className="homepage__title">
          La sélection
        </h2>
        <p className="homepage__subtitle">Découvrez les 3 films qui effraient le plus nos membres</p>
        <Carousel format="small" movies={tmdbIDs} />
      </div>
    </div>
  );
};

Homepage.propTypes = {
  loadTopMovies: PropTypes.func.isRequired,
  isLogged: PropTypes.bool.isRequired,
  topMovies: PropTypes.shape({
    loaded: PropTypes.bool.isRequired,
    tmdbIDs: PropTypes.arrayOf(
      PropTypes.number,
    ),
  }).isRequired,
};

const mapStateToProps = ({ movies: { topMovies }, login: { isLogged } }) => ({
  topMovies,
  isLogged,
});

const mapDispatchToProps = (dispatch) => ({
  loadTopMovies: (movies) => {
    dispatch(getTopMovies(movies));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Homepage);
