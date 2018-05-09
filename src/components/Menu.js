import React from 'react';
import AppBar from 'material-ui/AppBar';
import Tabs, { Tab } from 'material-ui/Tabs';
import Colors from '../globals/Colors';
import Quiz from './Quiz';
import HighScores from './HighScores';
import Profile from './Profile';

const styles = {
  tabs: {
    backgroundColor: Colors.Transparent,
    color: Colors.White,
  }
}

class Menu extends React.Component {
  state = {
    value: 0,
  };

  handleChange = (event, value) => {
    this.setState({ value });
  };

  render() {
    const { value } = this.state;

    return (
      <div>
        <AppBar position="static" style={styles.tabs}>
          <Tabs value={value} onChange={this.handleChange}>
            <Tab label="Quiz" />
            <Tab label="High scores" />
            <Tab label="Profile" />
          </Tabs>
        </AppBar>
        {value === 0 && <Quiz />}
        {value === 1 && <HighScores/>}
        {value === 2 && <Profile/>}
      </div>
    );
  }
}

export default Menu;
