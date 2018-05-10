import React, { Component } from 'react';

export default class HighScores extends Component {
  render() {
    console.log('highscore props passed: ', this.props.user)
    return (
      <div className="HighScores">
      </div>
    );
  }
}
