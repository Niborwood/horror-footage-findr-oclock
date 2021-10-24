import React from 'react';
import { Provider } from 'react-redux';
import { render, screen } from '@testing-library/react';

import store from '../../store';
import Button from './index';

it('Button renders message via textContent', () => {
  render(
    <Provider store={store}>
      <Button textContent="Animations activées" />
    </Provider>,
  );
  expect(screen.getByText('Animations activées')).toBeInTheDocument();
});
