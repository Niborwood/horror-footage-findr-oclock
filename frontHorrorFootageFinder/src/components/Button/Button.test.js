import React from 'react';
import ReactTestRenderer from 'react-test-renderer';
import { Provider } from 'react-redux';
import { render, screen } from '@testing-library/react';

import store from '../../store';
import Button from './index';

describe('Button testing', () => {
  // Renders readable textContent
  it('renders message via textContent', () => {
    render(
      <Provider store={store}>
        <Button textContent="Animations activées" />
      </Provider>,
    );
    expect(screen.getByText('Animations activées')).toBeInTheDocument();
  });

  // v1 snapshot of Button
  it('renders as the v1 version of Button comoponent with className, onClick, selected, type & value', () => {
    const component = ReactTestRenderer.create(
      <Provider store={store}>
        <Button textContent="Animations activées" />
      </Provider>,
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
