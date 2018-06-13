import React, { Component } from 'react';
import Quizcard from './Quizcard';

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
    }
  }

  onChangeLinkName = (finished) => {
    this.setState({finished: finished})
    console.log(finished);
  }


  render() {
    const user = this.props.user;
    return (
      <div className="Quiz">
      { this.props.authenticated
        ?
        <div>
          <h2 style={styles.title}>QUIZ</h2>
          <Quizcard
            user={user}
            changeName={this.onChangeLinkName.bind(this)}
          />
        </div>
        :
        <div>
        </div>
      }
      </div>
    );
  }
}
