/* eslint-disable max-len */
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import './modal.scss';

// Paramètres du composant "Modal"
// onConfirm et OnCancel seront respectivement appelé au click sur valider et cancel (ils sont optionnels)
export function Modal({
  title, textContent, onConfirm, onCancel,
}) {
  return (
    <div className="modal">
      <div className="modal__wrapper">
        <h1 className="modal__title">{title}</h1>
        <p>{textContent}</p>
        { onConfirm ? <button type="button" className="modal__button" onClick={onConfirm}>Valider</button> : null}
        { onCancel ? <button type="button" className="modal__button" onClick={onCancel}>Cancel</button> : null}
      </div>
    </div>
  );
}

Modal.propTypes = {
  title: PropTypes.string.isRequired,
  textContent: PropTypes.string,
  onCancel: PropTypes.func,
  onConfirm: PropTypes.func,
};

Modal.defaultProps = {
  textContent: '',
  onCancel: () => {},
  onConfirm: () => {},
};

const mapStateToProps = () => ({
});

const mapDispatchToProps = () => ({

});

export default connect(mapStateToProps, mapDispatchToProps)(Modal);
