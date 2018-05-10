import React, { Component } from 'react';
import  firebase, { signedIn } from '../globals/firebase.js';
import Button from 'material-ui/Button';

export default class Quiz extends Component {

  render() {
    return (
      <div className="Quiz">
        <h1>QUIZ</h1>
        <Button variant="raised" color="secondary" onClick={signedIn}>GET USER INFO</Button>
      </div>
    );
  }
}
