import React, { useRef } from 'react';
// import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Button from '../Button';
import HomeSelection from '../HomeSelection';

import './homepage.scss';

export const Homepage = () => {
  const homepageSelection = useRef(null);
  const scrollToHomepageSelection = () => {
    homepageSelection.current.scrollIntoView({
      behavior: 'smooth',
    });
  };

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
        <Button onClick={scrollToHomepageSelection} to="/#homepage-selection" textContent="Découvrir" />
      </div>

      <HomeSelection />
    </div>
  );
};

Homepage.propTypes = {
};

const mapStateToProps = () => ({

});

const mapDispatchToProps = {

};

export default connect(mapStateToProps, mapDispatchToProps)(Homepage);
