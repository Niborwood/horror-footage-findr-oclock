/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
import sum from './sum';

it('sums numbers', () => {
  expect(sum(1, 2)).toEqual(3);
  expect(sum(2, 2)).toEqual(4);
});
// import { toggleMasked, TOGGLE_MASKED } from '../../actions/register';

// const sum = require('./sum');

// const register = require('./index');

// it('should create an action with INCREMENT_BY type', () => {
//   const expectation = {
//     type: 'TOGGLE_MASKED',
//   };

//   expect(toggleMasked()).toEqual(expectation);
// });
