/* eslint-disable react/forbid-prop-types */
/* eslint-disable react/require-default-props */
import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { submitWatchlistAndWatched } from '../../actions/watchlist';
import './watchlist.scss';
import Carousel from '../Carousel';

export const Watchlist = ({ watchlist, watched }) => {
  console.log(watchlist);
  console.log(watched);

  return (
    <div>
      <div className="container__watchlist">
        <h1>WatchList</h1>
        <Carousel format="small" movies={watchlist} />

      </div>
      <div className="container__watched">
        <h1>Watched</h1>
        <Carousel format="small" movies={watched} />

      </div>
    </div>
  );
};
Watchlist.propTypes = {
  watchlist: PropTypes.array.isRequired,
  watched: PropTypes.array.isRequired,
};

const mapStateToProps = (state) => ({
  watchlist: state.ui.watchList,
  watched: state.ui.watched,
});

const mapDispatchToProps = {

};

export default connect(mapStateToProps, mapDispatchToProps)(Watchlist);
