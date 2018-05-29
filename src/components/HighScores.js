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
    margin: '10px auto',
    width: 500,
    color: Colors.Black,
  },
  title: {
    textAlign: 'center',
    marginTop: '100px',
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
          <ListItemText primary={`${user.username}`} secondary={`Totalscore: ${user.quizscore}`} />
        </ListItem>
      )
    }



  render() {
    return (
      <div>
      { this.props.authenticated
        ?
        <div>
          <h2 style={styles.title}>HIGH SCORES</h2>
        <div style={styles.container}>
          <List>
            {this.getHighScore()}
          </List>
        </div>
        </div>
        :
        <div>
        </div>

      }
      </div>
    );
  }
}
