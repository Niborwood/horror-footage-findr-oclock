import React from 'react';
// import PropTypes from 'prop-types'
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';

import Arrow from '../Arrow';

import './movieresults.scss';

export const MovieResults = () => (
  <div className="movie-results">
    <h2 className="movie-results__title">Autres résultats</h2>
    <p className="movie-results__textinfo">
      Déjà vu ?
      {' '}
      <br />
      20 autres résultats correspondent à vos réponses.
    </p>
    <div className="movie-results__another-result">
      <NavLink to="/movie/10086">
        <Arrow />
        {' '}
        Me proposer un autre résultat parmi les mêmes critères
        {' '}
      </NavLink>
    </div>
    <div className="movie-results__another-quiz">
      {/* !!! PREVOIR LE ONCLICK RESET QUIZ !!! */}
      <NavLink to="/quiz">
        {' '}
        <Arrow type="double" />
        {' '}
        Relancer un test
        {' '}
      </NavLink>
    </div>
  </div>
);

MovieResults.propTypes = {
};

const mapStateToProps = () => ({

});

const mapDispatchToProps = {

};

export default connect(mapStateToProps, mapDispatchToProps)(MovieResults);
