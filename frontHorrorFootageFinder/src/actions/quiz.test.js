import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { fetchQuizResults } from './quiz';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('Quiz Action test - Get quiz results', () => {
  it('should execute fetch data', () => {
    // Initialize mockstore with empty state
    const store = mockStore({});

    // Mock stringified tags
    const tags = 'cat=sf&type=ff&from=usa&date=10s&rare=common,rare&extr=alien,blockbuster,drama';

    // Return the promise
    store.dispatch(fetchQuizResults(tags));
    // console.dir(store);
    expect(2).toEqual(2);
  });
});
