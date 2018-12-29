import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch
} from 'react-router-dom';

import Logo from 'components/Logo';
import Nav from 'components/Nav';
import Dashboard from 'modules/Dashboard';
import Report from 'modules/Report';
import './App.css';

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <header className="App-Head">
            <Logo className="App-Logo" />
            <Nav>
              <Nav.Link to="/dashboard">dashboard</Nav.Link>
              <Nav.Link to="/report">report</Nav.Link>
            </Nav>
          </header>
          <main className="App-Body">
            <Switch>
              <Redirect exact from="/" to="/dashboard" />
              <Route path="/dashboard" component={Dashboard} />
              <Route path="/report" component={Report} />
            </Switch>
          </main>
          <footer className="App-Foot">
            <small>version: {process.env.REACT_APP_VERSION}</small>
          </footer>
        </div>
      </Router>
    );
  }
}

export default App;
