import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

// SCSS
import './glitch.scss';

// IMPORT D'ACTION/DISPATCH
import { toggleGlitch } from '../../actions/ui';

// RENDU DU COMPOSANT
export const Glitch = ({ glitch, onToggleGlitch }) => {
  if (!glitch) {
    return null;
  }
  // On fait disparaître ce composant au bout de quelques secondes
  const glitchDiv = useRef(null);
  useEffect(() => {
    const glitchEffect = setTimeout(() => {
    //   glitchDiv.current.classList.add('glitch-ui__hide');
      // Close the timeout between 0.2 and 0.8 secondes randomly
      onToggleGlitch();
    }, Math.random() * (400 - 200) + 450);

    return () => {
      clearTimeout(glitchEffect);
    };
  }, [glitch]);

  return (
    <div className="glitch-ui" ref={glitchDiv} />
  );
};

Glitch.propTypes = {
  glitch: PropTypes.bool.isRequired,
  onToggleGlitch: PropTypes.func.isRequired,
};

const mapStateToProps = ({ ui: { glitch } }) => ({
  glitch,
});

const mapDispatchToProps = (dispatch) => ({
  onToggleGlitch: () => dispatch(toggleGlitch()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Glitch);
