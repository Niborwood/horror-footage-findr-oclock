import React, { useRef } from 'react';
// import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Button from '../Button';
import SingleMovie from '../SingleMovie';
import Arrow from '../Arrow';

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

      <div id="homepage-selection" className="homepage__selection" ref={homepageSelection}>
        <div className="homepage__selection-arrow-next">
          <Arrow type="rewind" />
        </div>
        <div className="homepage__selection-list">
          <div className="homepage__selection-movie">
            <SingleMovie format="small" movieID={7191} />
          </div>
          <div className="homepage__selection-movie">
            <SingleMovie format="small" movieID={7191} />
          </div>
          <div className="homepage__selection-movie">
            <SingleMovie format="small" movieID={7191} />
          </div>
        </div>
        <div className="homepage__selection-arrow-back">
          <Arrow type="double" />
        </div>
      </div>
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
