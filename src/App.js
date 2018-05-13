import React, { Component } from 'react';
import firebase from './globals/firebase';
import Menu from './components/Menu';

export default class App extends Component {
  constructor() {
    super();
    this.state = {
      authenticated: false,
      name: '',
      photo: '',
      email: '',
      uid: '',
  }
}

componentDidMount() {
  this.authListener = firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      this.setState({authenticated: true})
    } else {
      this.setState({authenticated: false})
    }
    if (this.state.authenticated === true) {
      this.setState({name: user.displayName});
      this.setState({photo: user.photoURL});
      this.setState({email: user.email});
      this.setState({uid: user.uid});

    }
  })
}

componentWillUnMount() {
  this.authListener();
}

  render() {
    let user = {
      name: this.state.name,
      photo: this.state.photo,
      email: this.state.email,
      uid: this.state.uid,
    }
    return (
      <Menu user={user} authenticated={this.state.authenticated}/>
    )
  }
}
