import React from 'react';
import ReactTestRenderer from 'react-test-renderer';
import { Provider } from 'react-redux';
import { render, screen } from '@testing-library/react';
import sinon from 'sinon';

import store from '../../store';
import Toggle from './index';

describe('Toggle testing', () => {
  // Test if an error is thrown when the component is rendered without textContent prop
  it('should throw console.error when missing textContent prop', () => {
    const stub = sinon.stub(console, 'error');
    render(
      <Provider store={store}>
        <Toggle name="toggleAnimations" />
      </Provider>,
    );
    expect(stub.calledOnce).toBe(true);
    stub.restore();
  });

  // Test if an error is thrown when the component is rendered without name prop
  it('should throw console.error when missing name prop', () => {
    const stub = sinon.stub(console, 'error');
    render(
      <Provider store={store}>
        <Toggle textContent="Animations activées" />
      </Provider>,
    );
    expect(stub.called).toBe(true);
    stub.restore();
  });
});
