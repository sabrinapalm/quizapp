import React, { Component } from 'react';
import Button from 'material-ui/Button';
import firebase from '../globals/firebase';


const styles = {
  logoutButton: {
    position: 'absolute',
    width: 100,
    top: 5,
    right: 10,
  }
}

export default class Logout extends Component {
  constructor() {
    super();
    this.state = {
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
      <Button style={styles.logoutButton} variant="raised" color="secondary" onClick={this.logOut}>
        LOG OUT
      </Button>
    );
  }
}
