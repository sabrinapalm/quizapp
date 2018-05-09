import React, { Component } from 'react';
import Button from 'material-ui/Button';
import Colors from '../globals/Colors';

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
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">QUIZ<span style={{color: Colors.Accent}}>&#916;PP</span></h1>
        </header>
        <Button variant="raised" style={style.button}>
          Logga in
      </Button>
      </div>
    );
  }
}

export default Login;
