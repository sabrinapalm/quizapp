import React, { Component } from 'react';
import Avatar from 'material-ui/Avatar';
import Button from 'material-ui/Button';
import Colors from '../globals/Colors';
import firebase from '../globals/firebase';

const styles = {
  container: {
    backgroundColor: Colors.transparent,
    color: Colors.White,
    textAlign: 'center',
  },
  photo: {
    width: 150,
    height: 150,
    margin: '180px auto',
    marginBottom: 0,
  }
}

export default class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      email: '',
      score: null,
    }
    this.getUserData = this.getUserData.bind(this);
  }

  getUserData = () => {
    let userId = this.props.user.uid;
    return firebase.database().ref('/users/' + userId).once('value').then((snapshot) => {
      let result = snapshot.val();

      let userdata = {
        name: result.username,
        email: result.email,
        score: result.quizscore,
      }

      this.setState({username: userdata.name})
      this.setState({email: userdata.email})
      this.setState({score: userdata.score})

    })
  };

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
        <span>Email: {this.props.user.email}</span>
        <p>Score: {this.state.score}</p>
        <br />
        <br />
        <Button color="secondary" variant="raised" onClick={this.getUserData}>Get user info!</Button>
      </div>
    :
      <div></div>
}
</div>
    )
  }
}
