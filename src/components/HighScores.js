import React, { Component } from 'react';
import List, { ListItem, ListItemText } from 'material-ui/List';
import Avatar from 'material-ui/Avatar';
import Colors from '../globals/Colors';
import firebase from '../globals/firebase';

const styles = {
  container: {
    backgroundColor: Colors.White,
    border: '2px solid',
    borderColor: Colors.Accent,
    margin: '100px auto',
    width: 500,
    color: Colors.Black,
  }
}

export default class HighScores extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
    }
  }

  componentDidMount(){
      firebase.database().ref('users').once('value').then((snapshot) => {
        snapshot.forEach((child) => {
          let users = child.val();
          this.setState({ data: [...this.state.data, users]})
        })

      })
    }

  getHighScore(){
        return this.state.data.map((user) =>
        <ListItem key={user.uid}>
          <Avatar alt={user.username} src={user.photo} />
          <ListItemText primary={`${user.username}`} secondary={user.quizscore} />
        </ListItem>
      )
    }



  render() {
    return (
      <div>
      { this.props.authenticated
        ?
        <div style={styles.container}>
        <List>
          {this.getHighScore()}
          </List>
        </div>
        :
        <div>
        </div>
      }
      </div>
    );
  }
}
