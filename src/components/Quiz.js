import React, { Component } from 'react';
import Quizcard from './Quizcard';

const styles = {
  title: {
    textAlign: 'center',
    marginTop: '100px',
  }
}

export default class Quiz extends Component {
  render() {
    const user = this.props.user;
    return (
      <div className="Quiz">
      { this.props.authenticated
        ?
        <div>
          <h2 style={styles.title}>QUIZ</h2>
          <Quizcard user={user}/>
        </div>
        :
        <div>
        </div>
      }

      </div>
    );
  }
}
