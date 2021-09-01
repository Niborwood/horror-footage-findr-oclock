/* eslint-disable no-nested-ternary */
import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Button from '../Button';
import Carousel from '../Carousel';

import { getTopMovies } from '../../actions/movies';

import './homepage.scss';

export const Homepage = ({
  loadTopMovies,
  topMovies: { loaded, tmdbIDs }, isLogged,
  errorMessage,
  errorSelection,
}) => {
  // Appel à l'API interne pour récupérer les 3 films les plus populaires
  // selon les utilisateurs du site

  useEffect(() => {
    loadTopMovies(3);
  }, []);

  // Gestion du bouton "Découvrir" pour le carousel de sélection
  // const scrollToHomepageCarousel = () => {
  //   homepageCarousel.current.scrollIntoView({
  //     behavior: 'smooth',
  //   });
  // };

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

      {loaded ? (
        <div id="home-carousel">
          <h2 className="homepage__title">
            La sélection
          </h2>
          <p className="homepage__subtitle">Découvrez les 3 films qui effraient le plus nos membres</p>
          <Carousel format="small" movies={tmdbIDs} />
        </div>
      ) : errorSelection ? (
        <div>{errorMessage}</div>) : <div>Chargement...</div>}

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
  errorSelection: PropTypes.bool,
  errorMessage: PropTypes.string,
};

Homepage.defaultProps = {
  errorSelection: false,
  errorMessage: '',
};

const mapStateToProps = ({ movies: { topMovies }, login: { isLogged } }) => ({
  topMovies,
  isLogged,
  errorSelection: topMovies.error,
  errorMessage: topMovies.errorMessage,
});

const mapDispatchToProps = (dispatch) => ({
  loadTopMovies: (movies) => {
    dispatch(getTopMovies(movies));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Homepage);
