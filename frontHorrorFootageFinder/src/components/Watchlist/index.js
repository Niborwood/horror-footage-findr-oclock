import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import Carousel from '../Carousel';

export const Watchlist = () => (
  <div>
    <div>watchlist</div>
    {/* <Carousel format="small" movies={}/> */}
    <div>watched</div>
    {/* <Carousel format="small" movies={}/> */}
  </div>
);

Watchlist.propTypes = {
};

const mapStateToProps = () => ({

});

const mapDispatchToProps = {

};

export default connect(mapStateToProps, mapDispatchToProps)(Watchlist);
