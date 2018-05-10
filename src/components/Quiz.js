import React, { Component } from 'react';


export default class Quiz extends Component {
  render() {
    console.log('quiz props passed: ', this.props.user)
    return (
      <div className="Quiz">
        <h1>Hi, {this.props.user.name}</h1>
        <img src={this.props.user.photo} alt="Bild"/>
      </div>
    );
  }
}
