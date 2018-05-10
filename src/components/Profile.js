import React, { Component } from 'react';

export default class Profile extends Component {
  render() {
    console.log('profile props passed: ', this.props.user)
    return (
      <div className="Profile">
      </div>
    );
  }
}
