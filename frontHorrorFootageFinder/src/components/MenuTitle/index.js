import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import './menuTitle.scss';

export function MenuTitle({ content }) {
  return (
    <h2 className="menu-title">{content}</h2>
  );
}

MenuTitle.propTypes = {
  content: PropTypes.string.isRequired,
};

const mapStateToProps = () => ({
});

const mapDispatchToProps = () => ({

});

export default connect(mapStateToProps, mapDispatchToProps)(MenuTitle);
