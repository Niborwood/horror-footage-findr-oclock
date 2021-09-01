/* eslint-disable react/forbid-prop-types */
/* eslint-disable react/require-default-props */
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import './watchlist.scss';
import Carousel from '../Carousel';
import MenuTitle from '../MenuTitle';

export const Watchlist = ({ watchlist, watched }) => (
  <div className="watchlist-page">
    {watchlist.length > 0
    && (
    <div className="container__watchlist">
      <MenuTitle content="Films à voir" title="main" />
      <Carousel format="small" movies={watchlist} watchlist />
    </div>
    )}
    {watched.length > 0
    && (
    <div className="container__watched">
      <MenuTitle content="deja vu" title="main" />
      <Carousel format="small" movies={watched} watchlist />
    </div>
    )}
    {watchlist.length === 0 && watched.length === 0
      ? (
        <div className="watchlist__text">
          <p>
            Vous n&apos;avez pas de film dans votre
            liste de films à voir où dans celle de films vus.
            {' '}
            <br />
            <br />
            un petit
            {' '}
            <NavLink className="watchlist__text__link" to="/quiz">quiz</NavLink>
            {' '}
            pour y remédier?
          </p>

        </div>
      ) : ''}
  </div>
);
Watchlist.propTypes = {
  watchlist: PropTypes.array.isRequired,
  watched: PropTypes.array.isRequired,
};

const mapStateToProps = (state) => ({
  watchlist: state.ui.watchlist,
  watched: state.ui.watched,
});

const mapDispatchToProps = {

};

export default connect(mapStateToProps, mapDispatchToProps)(Watchlist);
