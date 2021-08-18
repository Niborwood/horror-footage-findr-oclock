import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';

export const Watchlist = () => (
  <div>
    <div>watchlist</div>
    <div>watched</div>
  </div>
);

Watchlist.propTypes = {
};

const mapStateToProps = () => ({

});

const mapDispatchToProps = {

};

export default connect(mapStateToProps, mapDispatchToProps)(Watchlist);
