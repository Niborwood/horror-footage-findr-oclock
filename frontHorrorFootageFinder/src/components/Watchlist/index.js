/* eslint-disable react/forbid-prop-types */
/* eslint-disable react/require-default-props */
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import './watchlist.scss';
import Carousel from '../Carousel';
import MenuTitle from '../MenuTitle';

export const Watchlist = ({ watchlist, watched }) => (
  <div>
    <div className="container__watchlist">
      <MenuTitle content="Films à voir" />
      <Carousel format="small" movies={watchlist} />
    </div>
    <div className="container__watched">
      <MenuTitle content="deja vu" />
      <Carousel format="small" movies={watched} />
    </div>
  </div>
);
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
