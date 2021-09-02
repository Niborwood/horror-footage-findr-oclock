import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import './credits.scss';
import { CreditsElement } from '../CreditsElement';

import tmdbLogo from '../../assets/images/tmdb-logo.svg';
import screen from '../../assets/images/screen.jpg';

export const Credits = (props) => (
  <div>
    <div className="tv-img">
      <img src={screen} alt="télé" />
      <div className="fade-effect" />
      <div className="scroll-container-credits">
        <div className="scroll-credits-text">
          <div className="scroll-credits-title">Concepteurs</div>
          <CreditsElement text="Robin Souriau" />
          <CreditsElement text="Sophie Seignon" />
          <CreditsElement text="Corentin Couzigou" />
          <CreditsElement text="Arnaud Delperier" />
          <div className="scroll-credits-title">Remerciements</div>
          <CreditsElement text="justwatch.com" />
          <CreditsElement text="pixabay.com" />
          <CreditsElement text="dafont.com" />
          <CreditsElement text="themoviedb.org" />
          <div className="scroll-credits-img"><img src={tmdbLogo} alt="logo tmdb" /></div>
        </div>
      </div>
    </div>
  </div>
);

Credits.propTypes = {
};

const mapStateToProps = (state) => ({

});

const mapDispatchToProps = {

};

export default connect(mapStateToProps, mapDispatchToProps)(Credits);
