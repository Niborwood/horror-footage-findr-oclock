import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import './watchlist.scss';
import Carousel from '../Carousel';

export const Watchlist = () => (
  <div>
    <div className="container__watchlist">
      <h1>WatchList</h1>
      <Carousel format="small" movies={[179, 189, 199]} />

    </div>
    <div className="container__watched">
      <h1>Watched</h1>
      <Carousel format="small" movies={[179, 189, 199, 89]} />

    </div>
  </div>
);

Watchlist.propTypes = {
};

const mapStateToProps = () => ({

});

const mapDispatchToProps = {

};

export default connect(mapStateToProps, mapDispatchToProps)(Watchlist);
