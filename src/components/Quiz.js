import React, { Component } from 'react';
import Quizcard from './Quizcard';
import FinishedQuiz from './FinishedQuiz';

const styles = {
  title: {
    textAlign: 'center',
    marginTop: '100px',
  }
}

export default class Quiz extends Component {
  constructor(){
    super();
    this.state = {
    finished: false,
    score: 0,
    }
    this.finishedQuiz = this.finishedQuiz.bind(this);
  }

  finishedQuiz = (finished, score) => {
    this.setState({
      finished: finished,
      score: score
    })
  }


  render() {
    const user = this.props.user;
    if (this.state.finished === false) {
      return (
        <div className="Quiz">
        { this.props.authenticated ?
          <div>
          <h2 style={styles.title}>QUIZ</h2>
          <Quizcard
            user={user}
            finished={this.finishedQuiz}
          />
          </div>
          :
          null
        }
        </div>
      )
    } 
      return (
        <div>
          <FinishedQuiz
            user={user}
            score={this.state.score}
            finished={this.finishedQuiz}
          />
        </div>
      )
  }
}
