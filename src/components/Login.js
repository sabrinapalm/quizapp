import React, { Component } from 'react';
import firebase, {googleProvider, auth} from '../globals/firebase.js';
import Button from 'material-ui/Button';
import Colors from '../globals/Colors';
import Avatar from 'material-ui/Avatar';
import '../css/Login.css';

const style = {
  button: {
    background: Colors.Transparent,
    borderRadius: 0,
    border: '2px solid white',
    color: Colors.White,
    height: 40,
    padding: '0 20px',
    width: 280
  },
};


class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      photo: '',
      loginError: false,
    }
  }

loginGoogle = () => {
  const { history } = this.props;

  auth.signInWithPopup(googleProvider).then((result) => {
    const user = result.user;
    console.log(user);
    this.setState({name: user.displayName});
    this.setState({photo: user.photoURL});
  })
}


  render() {
    return (
      <div className="App">
      <Avatar
        alt={this.state.name}
        src={this.state.photo}
      />
        <header className="App-header">
          <h1 className="App-title">QUIZ<span style={{color: Colors.Accent}}>&#916;PP</span></h1>
        </header>
        <Button variant="raised" style={style.button} onClick={this.loginGoogle}>
          Sign in with Google
      </Button>
      </div>
    );
  }
}

export default Login;
