import React from 'react';
// import PropTypes from 'prop-types'
import { connect } from 'react-redux';

import Arrow from '../Arrow';
import SingleMovie from '../SingleMovie';

import './homeselection.scss';

export const HomeSelection = () => {
  // Fake data
  const ids = [186, 227, 221];
  const movies = ids.map((id) => (
    <div key={id} className="home-selection__movie">
      <SingleMovie format="small" movieID={id} />
    </div>
  ));

  return (
    <div id="home-selection" className="home-selection">
      <div className="home-selection__arrow-next">
        <Arrow type="rewind" />
      </div>
      <div className="home-selection__list">
        {movies}
      </div>
      <div className="home-selection__arrow-back">
        <Arrow type="double" />
      </div>
    </div>
  );
};

HomeSelection.propTypes = {
};

const mapStateToProps = () => ({

});

const mapDispatchToProps = {

};

export default connect(mapStateToProps, mapDispatchToProps)(HomeSelection);
