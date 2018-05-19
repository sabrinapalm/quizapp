import React from 'react';
import AppBar from 'material-ui/AppBar';
import Tabs, { Tab } from 'material-ui/Tabs';
import Colors from '../globals/Colors';
import Quiz from './Quiz';
import HighScores from './HighScores';
import Profile from './Profile';
import Login from './Login';
import Logout from './Logout';

const styles = {
  tabs: {
    backgroundColor: Colors.Transparent,
    color: Colors.White,
  },
  loginButton: {
    position: 'absolute',
    right: 10,
    top: 5,
  },
  photo: {
    position: 'absolute',
    right: 120,
    top: 5,
    height: 37,
    width: 37,
  }
}


export default class Menu extends React.Component {
  constructor(){
    super();
    this.state = {
      value: 1,
    }
  }

  handleChange = (event, value) => {
    this.setState({ value });
  };

  render() {
    const { value } = this.state;
    return (
      <div>
      { this.props.authenticated
        ?
        <AppBar position="static" style={styles.tabs}>
          <Tabs value={value} onChange={this.handleChange}>
          <Tab label="Quiz" />
          <Tab label="High scores" />
          <Tab label="Profile" />
          </Tabs>
          <Logout />
        </AppBar>
        :
        <Login />
      }
        {value === 0 && <Quiz user={this.props.user} authenticated={this.props.authenticated}/>}
        {value === 1 && <HighScores user={this.props.user} authenticated={this.props.authenticated}/>}
        {value === 2 && <Profile user={this.props.user} authenticated={this.props.authenticated}/>}
      </div>
    );
  }
}
