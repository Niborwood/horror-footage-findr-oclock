import React from 'react';
import PropTypes from 'prop-types';

function Arrow({ type }) {
  switch (type) {
    case 'single':
      return <span className="arrow-ui">▸</span>;

    case 'double':
      return <span className="arrow-ui arrow-ui__double">▸▸</span>;

    case 'rewind':
      return <span className="arrow-ui arrow_ui__rewind">◂◂</span>;

    default:
      break;
  }
}

Arrow.propTypes = {
  type: PropTypes.string,
};

Arrow.defaultProps = {
  type: 'single',
};

export default Arrow;
