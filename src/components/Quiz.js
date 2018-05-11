import React, { Component } from 'react';
import Quizcard from './Quizcard';

export default class Quiz extends Component {
  render() {
    const user = this.props.user;
    return (
      <div className="Quiz">
      { this.props.authenticated
        ?
        <div>
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
