import React, { Component } from 'react';
import List, { ListItem, ListItemText } from 'material-ui/List';
import Avatar from 'material-ui/Avatar';
import Colors from '../globals/Colors';
import firebase from '../globals/firebase';

const styles = {
  container: {
    backgroundColor: Colors.White,
    margin: '100px auto',
    width: 500,
    color: Colors.Black,
  }
}

export default class HighScores extends Component {
  constructor(props) {
    super(props);
    this.state = {
      scoreList: [],
    }
  }

  componentDidMount() {
    this.getHighScores();
  }

  getHighScores = () => {
    return firebase.database().ref('users').once('value').then((snapshot) => {

      snapshot.forEach(function(child) {

        let users = child.val();

        let user = {
          username: users.username,
          score: users.quizscore,
        }
        //this.setState({ scoreList: [...this.state.scoreList, user] })
      })

    })
  }

  render() {
    return (
      <div>
      { this.props.authenticated
        ?
        <div style={styles.container}>
          <List>

            <ListItem>
              <Avatar src={this.props.user.photo}/>
              <ListItemText primary="Sabrina Palm" secondary="Score: 0"/>
            </ListItem>

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
