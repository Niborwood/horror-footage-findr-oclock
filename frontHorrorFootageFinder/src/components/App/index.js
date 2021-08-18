import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import './App.scss';

// import Quiz from '../Quiz';
import Header from '../Header';
import Footer from '../Footer';
import Splash from '../Splash';
import MovieInfo from '../MovieInfo';
import Homepage from '../Homepage';

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
          <Route exact path="/">
            <Homepage />
          </Route>
          <Route path="/movie/:id">
            <MovieInfo />
          </Route>
          <Footer />
        </>

      </Switch>

    </div>
  );
}

App.propTypes = {
  splashPassed: PropTypes.bool.isRequired,
};

const mapStateToProps = ({ splashPassed }) => ({
  splashPassed,
});

const mapDispatchToProps = {

};

export default connect(mapStateToProps, mapDispatchToProps)(App);
