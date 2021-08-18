import React from 'react';
import { connect } from 'react-redux';

export const Loading = () => (
  <div className="loading-screen">
    Loading...
  </div>
);

Loading.propTypes = {
};

const mapStateToProps = () => ({

});

const mapDispatchToProps = {

};

export default connect(mapStateToProps, mapDispatchToProps)(Loading);
