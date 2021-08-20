import React from 'react';
// import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Button from '../Button';

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
    <Button to="/quiz" textContent="● Find My Tape ●" className="button-ui__launch" />
  </div>
);

Homepage.propTypes = {
};

const mapStateToProps = () => ({

});

const mapDispatchToProps = {

};

export default connect(mapStateToProps, mapDispatchToProps)(Homepage);
