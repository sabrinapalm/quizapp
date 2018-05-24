import React, { Component } from 'react';
import Avatar from 'material-ui/Avatar';
import Colors from '../globals/Colors';
import firebase from '../globals/firebase';
import EditIcon from '@material-ui/icons/Edit';


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
    border: '2px solid',
    borderColor: Colors.Accent,
  },
  button: {
    backgroundColor: Colors.Transparent,
    width: 10,
  }
}

//Flytta detta till parent component,använd props för att skicka info!
export default class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      email: '',
      score: null,
      edit: false,
    }
    this.getUserData = this.getUserData.bind(this);
  }

componentDidMount() {
  this.getUserData();
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

  handleClose = () => {
    this.setState({ open: false });
  };

  changeUserName = () => {
    this.setState({ open: true });
    var user = firebase.auth().currentUser;
    console.log(user);

    /*
    user.updateProfile({
      displayName: "Jane Q. User",
      }).then(function() {
      // Update successful.
      }).catch(function(error) {
      // An error happened.
    });
    */
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
        <div>
      </div>
        <h2>{this.state.username} <EditIcon style={{color: Colors.Accent, cursor: 'pointer'}} onClick={this.changeUserName}/> </h2>
        <span>Email: {this.state.email}</span>
        <p>Score: {this.state.score}</p>
        <br />
        <br />
      </div>
    :
      <div></div>
}
</div>
    )
  }
}
