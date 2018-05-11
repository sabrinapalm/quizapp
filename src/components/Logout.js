import React, { Component } from 'react';
import Button from 'material-ui/Button';
import firebase from '../globals/firebase';


const styles = {
  logoutButton: {
    position: 'absolute',
    width: 100,
    top: 6,
    right: 10,
    color: 'white',
    border: '2px solid white',
  }
}

export default class Logout extends Component {
  constructor() {
    super();
    this.state = {
      title: 'LOG OUT',
    }
  }

  logOut = () => {
    firebase.auth().signOut().then(function() {
    }).catch(function(error) {
      console.log(error.message);
    })
  }

  render() {
    return (
      <Button style={styles.logoutButton} size="small" onClick={this.logOut}>
        {this.state.title}
      </Button>
    );
  }
}
