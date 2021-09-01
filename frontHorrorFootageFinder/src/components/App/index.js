import React, { useEffect } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { localStorageModifyLOGIN, localStorageModifyUI } from '../../actions/login';

import './App.scss';

// Arnaud: rassembler tout ça en un seul import {toto, tata, titi} from ???
import Quiz from '../Quiz';
import Header from '../Header';
import Footer from '../Footer';
import Splash from '../Splash';
import Movie from '../Movie';
import Homepage from '../Homepage';
import Register from '../Register';
import Profile from '../Profile';
import Watchlist from '../Watchlist';
import Settings from '../Settings';
import Login from '../Login';

function App({
  splashPassed,
  handleLocalStorageModifyLOGIN,
  handleLocalStorageModifyUI,
}) {
  if (localStorage.length > 0) {
    const token = localStorage.getItem('token');
    console.log(token);
    const email = localStorage.getItem('email');
    const pseudo = localStorage.getItem('pseudo');
    const id = localStorage.getItem('id');
    const watchlistItem = localStorage.getItem('watchlist');
    const watchlistArray = watchlistItem.split(',');
    const watchlistFinalResult = watchlistArray.map((element) => parseInt(element, 10));
    const watchedItem = localStorage.getItem('watched');
    const watchedArray = watchedItem.split(',');
    const watchedFinalResult = watchedArray.map((element) => parseInt(element, 10));

    handleLocalStorageModifyLOGIN(email, pseudo, true, id, token);
    handleLocalStorageModifyUI(watchlistFinalResult, watchedFinalResult);
  }

  // Quand on lance l'appli si la date actuel dépasse de 3h (10 800 000 ms) la
  // date de création du token on clear le localStorage
  if ((Date.now() - 10800000) > parseInt(localStorage.getItem('timeStamp'), 10)) {
    localStorage.clear();
  }

  return (
    <div className="app">
      { splashPassed || <Redirect to="/splash" />}

      <Switch>
        {/* En tant qu'application basée sur l'expérience utilisateur,
      le splash passe toujours avant la home, d'où cette redirection. */}
        <Route path="/splash" component={Splash} />
        <>
          <Header />
          <main className="app__content">
            <Route exact path="/">
              <Homepage />
            </Route>
            <Route path="/movie/:id">
              <Movie />
            </Route>
            <Route path="/quiz">
              <Quiz />
            </Route>
            <Route path="/register">
              <Register />
            </Route>

            <Route path="/profile">
              <Profile />
            </Route>
            <Route path="/watchlist">
              <Watchlist />
            </Route>
            <Route path="/settings">
              <Settings />
            </Route>

            <Route path="/login">
              <Login />
            </Route>
          </main>
          <Footer />
        </>
      </Switch>

    </div>
  );
}

App.propTypes = {
  splashPassed: PropTypes.bool.isRequired,
  handleLocalStorageModifyLOGIN: PropTypes.func.isRequired,
  handleLocalStorageModifyUI: PropTypes.func.isRequired,
};

const mapStateToProps = ({ ui: { splashPassed } }) => ({
  splashPassed,
});

const mapDispatchToProps = (dispatch) => ({
  handleLocalStorageModifyLOGIN: (email, pseudo, bool, id, token) => {
    const action = localStorageModifyLOGIN(email, pseudo, bool, id, token);
    dispatch(action);
  },
  handleLocalStorageModifyUI: (watchlistStorage, watchedStorage) => {
    const action = localStorageModifyUI(watchlistStorage, watchedStorage);
    dispatch(action);
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
