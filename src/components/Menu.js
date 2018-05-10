import React from 'react';
import AppBar from 'material-ui/AppBar';
import Tabs, { Tab } from 'material-ui/Tabs';
import AccountCircle from '@material-ui/icons/AccountCircle';
import firebase from '../globals/firebase.js';
import Button from 'material-ui/Button';
import Colors from '../globals/Colors';
import Quiz from './Quiz';
import HighScores from './HighScores';
import Profile from './Profile';

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
}


export default class Menu extends React.Component {
  constructor(){
    super();
    this.state = {
      value: 0,
    }
  }

  handleChange = (event, value) => {
    this.setState({ value });
  };

  logOut = () => {
        firebase.auth().signOut().then(function() {
          console.log('signed out')
        }).catch(function(error) {
          console.log(error.message);
        });
  };

  render() {
    const { value } = this.state;

    return (
      <div>
        <AppBar position="static" style={styles.tabs}>
          <Tabs value={value} onChange={this.handleChange}>
            <Tab label="Quiz" />
            <Tab label="High scores" />
            <Tab label="Profile" />
          </Tabs>
          <Button color="inherit" style={styles.loginButton} onClick={this.logOut}><AccountCircle />
          LOGOUT
          </Button>
        </AppBar>
        {value === 0 && <Quiz />}
        {value === 1 && <HighScores/>}
        {value === 2 && <Profile/>}
      </div>
    );
  }
}
