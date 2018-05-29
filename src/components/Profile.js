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
    margin: '10px auto',
    marginBottom: 0,
    border: '2px solid',
    borderColor: Colors.Accent,
  },
  button: {
    backgroundColor: Colors.Transparent,
    width: 10,
  },
  inputField: {
    backgroundColor: Colors.Transparent,
    border: '2px solid',
    borderColor: Colors.Accent,
    outline: 'none',
    color: Colors.White,
    padding: 5,
    marginTop: 10,
  },
  title: {
    textAlign: 'center',
    marginTop: '100px',
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
  changeUserName = () => {
    this.setState({ edit: true });
  }

  handleChange = name => event => {
    let userId = this.props.user.uid;
    this.setState({
      username: event.target.value,
    });
    firebase.database().ref('/users/' + userId).update({ username: event.target.value});

    if (event.key === 'Enter') {
      this.setState({ edit: false });
    }
  };

  render() {
    return (
      <div>
      {this.props.authenticated ?
        <div style={styles.container}>
        <h2 style={styles.title}>PROFILE</h2>
        <Avatar
          style={styles.photo}
          alt={this.props.user.name}
          src={this.props.user.photo}
        />
        <div>
      </div>
      {!this.state.edit ?
        <h2>{this.state.username} <EditIcon style={{color: Colors.Accent, cursor: 'pointer'}} onClick={this.changeUserName}/> </h2>
        :
        <input style={styles.inputField} type="text" onChange={this.handleChange('name')} onKeyPress={this.handleChange('name')}/>}
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
