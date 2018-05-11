import React, { Component } from 'react';
import Quizcard from './Quizcard';

export default class Quiz extends Component {
  render() {
    return (
      <div className="Quiz">
      { this.props.authenticated
        ?
        <div>
          <Quizcard />
        </div>
        :
        <div>
        </div>
      }

      </div>
    );
  }
}
