import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import  { googleProvider, auth } from '../globals/firebase.js';
import Button from 'material-ui/Button';
import Colors from '../globals/Colors';
import '../css/Login.css';
import logo from '../resources/logo.png'


const styles = {
  button: {
    background: Colors.Transparent,
    borderRadius: 0,
    border: '2px solid white',
    color: Colors.White,
    height: 48,
    padding: '0 20px',
    width: 270
  }
};


class Login extends Component {
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
    console.log(user);
    this.setState({loggedin: true})
    console.log(this.state.loggedin)
    console.log(user.displayName)

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

export default Login;
