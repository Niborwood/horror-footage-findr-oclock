import React, { useEffect } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getDataMovies } from '../../actions';

import './App.scss';

import Quiz from '../Quiz';
import Header from '../Header';
import Footer from '../Footer';
import Splash from '../Splash';
import MovieInfo from '../MovieInfo';
import Homepage from '../Homepage';
import Register from '../Register';
import Login from '../Login';

function App({ splashPassed, getData }) {
  useEffect(() => {
    console.log('useEffect');
    getData();
  }, []);
  return (
    <div className="app">
      { splashPassed || <Redirect to="/splash" />}

      <Switch>
        {/* En tant qu'application basée sur l'expérience utilisateur,
      le splash passe toujours avant la home, d'où cette redirection. */}
        <Route path="/splash" component={Splash} />
        <>
          <Header />
          <Route exact path="/">
            <Homepage />
          </Route>
          <Route path="/movie/:id">
            <MovieInfo />
          </Route>
          <Route path="/quiz">
            <Quiz />
          </Route>
          <Route path="/register">
            <Register />
          </Route>
          <Route path="/login">
            <Login />
          </Route>
          <Footer />
        </>

      </Switch>

    </div>
  );
}

App.propTypes = {
  splashPassed: PropTypes.bool.isRequired,
  getData: PropTypes.func.isRequired,
};

const mapStateToProps = ({ ui: { splashPassed } }) => ({
  splashPassed,
});

const mapDispatchToProps = (dispatch) => ({
  getData: () => {
    dispatch(getDataMovies());
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
