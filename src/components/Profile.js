import React, { Component } from 'react';
import Avatar from 'material-ui/Avatar';
import Colors from '../globals/Colors';

const styles = {
  container: {
    backgroundColor: Colors.transparent,
    color: Colors.White,
    textAlign: 'center',
  },
  photo: {
    width: 150,
    height: 150,
    margin: '100px auto',
    marginBottom: 0,
  }
}

export default class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {

    }
  }
  render() {
    return (
      <div>
      {this.props.authenticated ? <div style={styles.container}>
        <Avatar
          style={styles.photo}
          alt={this.props.user.name}
          src={this.props.user.photo}
        />
        <h2>{this.props.user.name}</h2>
      </div>
    :
      <div></div>
}
</div>
    )
  }
}
