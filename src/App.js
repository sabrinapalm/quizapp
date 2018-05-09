import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Login from './components/Login';
import HighScores from './components/HighScores';
import Profile from './components/Profile';
import Quiz from './components/Quiz';

class App extends Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route exact path='/' component={Login} />
          <Route path='/quiz' component={Quiz} />
          <Route path='/highscored' component={HighScores} />
          <Route path='/profile' component={Profile} />
        </Switch>
      </Router>
    )
  }
}

export default App;
