import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import  firebase, { googleProvider, auth } from '../globals/firebase.js';
import Button from 'material-ui/Button';
import Colors from '../globals/Colors';
import '../css/Login.css';
import logo from '../resources/logo.png';


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
    this.state = {
      loggedin: false,
    }
  }

loginGoogle = () => {

  const { history } = this.props;

  auth.signInWithPopup(googleProvider).then((result) => {
    const user = result.user;
    const ref = firebase.database().ref('users/');

    /*let currentUser = {
      username: user.displayName,
      photo: user.photoURL,
      id: user.uid,
      score: 0,
    }

    ref.once("value", function(snapshot){
      console.log(snapshot)
      //ref.push(currentUser);

    });*/

    this.setState({loggedin: true})

    if (this.state.loggedin === true) {
      history.push('/menu');
    }

  }).catch((error) => {
    console.log(error.message);
    this.setState({loggedin: false})
    console.log(this.state.loggedin)
  });

}

  render() {
    return (
      <div className="App">
          <header className="App-header">
          <img src={logo} alt="logo"/>
          </header>
          <Button variant="raised" style={styles.button} onClick={this.loginGoogle}>
            Sign in with Google
          </Button>
      </div>
    );
  }
}

Login.propTypes = {
  history: PropTypes.object.isRequired,
};
