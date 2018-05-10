import React, { Component } from 'react';
import Button from 'material-ui/Button';
import Colors from '../globals/Colors';
import '../css/Login.css';
import logo from '../resources/logo.png';
import { googleProvider, auth } from '../globals/firebase';


const styles = {
  button: {
    background: Colors.Transparent,
    borderRadius: 0,
    border: '2px solid white',
    color: Colors.White,
    height: 48,
    padding: '0 20px',
    width: 270
  },
  logosmall: {
    width: 50,
  },
};


export default class Login extends Component {
  constructor(props) {
    super(props);
    this.loginGoogle = this.loginGoogle.bind(this)
  }

  loginGoogle = () => {
    auth.signInWithPopup(googleProvider).then((result) => {
      console.log(result.user);
    }).catch((error) => {
      console.log(error.message);
    });
  }

  render() {
    return (
      <div className="App">
          <header className="App-header">
          <img src={logo} alt="logo"/>
          </header>
          <Button variant="raised" style={styles.button} onClick={ this.loginGoogle } user={"Sabrina"}>
            Sign in with Google
          </Button>
      </div>
    );
  }
}
