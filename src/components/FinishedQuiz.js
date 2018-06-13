import React, { Component } from 'react';
import Button from 'material-ui/Button';

const styles = {
  container: {
    textAlign: 'center',
    marginTop: '200px',
  }
}

export default class FinishedQuiz extends Component {
  constructor(){
    super();
    this.state = {
      score: 0,
      finished: false,
    }
  }

  handleClick = () => {
    this.props.finished(this.state.finished);
  }

  render() {
    return (
      <div className="Quiz">
        <div style={styles.container}>
          <h1>Quiz finished!</h1>
          You got {this.props.score} points out of 40 points.
          <br />
          <br />
          <Button
            style={styles.startquizButton}
            size="small"
            color="secondary"
            variant="raised"
            onClick={this.handleClick}>
            Redo
            </Button>
        </div>
      </div>
    );
  }
}
