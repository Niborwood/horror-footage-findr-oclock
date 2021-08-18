import React from 'react';
// import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import './homepage.scss';

export const Homepage = () => (
  <div className="homepage">
    <h2 className="homepage__title">
      Votre tape n&apos;attend que vous.
    </h2>
    <p className="homepage__subtitle">
      En quelques questions,
      <br />
      Trouvez le found footage parfait à voir ce soir.
    </p>
    <button type="button" className="homepage__play-button">Find My Tape</button>
  </div>
);

Homepage.propTypes = {
};

const mapStateToProps = () => ({

});

const mapDispatchToProps = {

};

export default connect(mapStateToProps, mapDispatchToProps)(Homepage);
