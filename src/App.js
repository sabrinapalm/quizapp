import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Login from './components/Login';
import Menu from './components/Menu';

class App extends Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route exact path='/' component={Login} />
          <Route exact path='/menu' component={Menu} />
        </Switch>
      </Router>
    )
  }
}

export default App;
