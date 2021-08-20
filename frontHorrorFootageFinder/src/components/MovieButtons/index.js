import React from 'react';
// import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Button from '../Button';

import './moviebuttons.scss';

export const MovieButtons = () => (
  <div className="movie-buttons">
    <Button textContent="Déjà vu" />
    <Button textContent="Ajouter à ma liste" />
    <Button textContent="Autre résultat" />
    <Button textContent="Relancer le quiz" />
  </div>
);

MovieButtons.propTypes = {
};

const mapStateToProps = () => ({

});

const mapDispatchToProps = {

};

export default connect(mapStateToProps, mapDispatchToProps)(MovieButtons);
