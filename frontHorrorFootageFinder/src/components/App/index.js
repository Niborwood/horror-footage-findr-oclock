import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

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

function App({ splashPassed }) {
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
};

const mapStateToProps = ({ ui: { splashPassed } }) => ({
  splashPassed,
});

const mapDispatchToProps = (/* dispatch */) => ({
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
