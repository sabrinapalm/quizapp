import React, { Component } from 'react';
import Colors from '../globals/Colors';
import Paper from 'material-ui/Paper';
import { FormGroup, FormControlLabel } from 'material-ui/Form';
import Checkbox from 'material-ui/Checkbox';
import Typography from 'material-ui/Typography';

const styles = {
  container: {
    backgroundColor: Colors.White,
    width: 300,
    margin: '100px auto',
    padding: 20
  },
  textStyle: {
    colors: Colors.White,
  }
}

class QuizCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      question: 'Who is the best?',
      checkedA: false,
      checkedB: false,
      checkedC: false,
      checkedD: false
    }
  }

  handleChange = name => event => {
  this.setState({ [name]: event.target.checked });
};

  render() {
    return (
      <div className="QuizCard">
        <Paper style={styles.container}>
          <Typography
            variant="headline"
            component="h3">
              {this.state.question}
          </Typography>
        <FormGroup row>
          <FormControlLabel
            control={
              <Checkbox
                checked={this.state.checkedA}
                onChange={this.handleChange('checkedA')}
                value="checkedA"
              />
            }
            label="Sabrina"
          />
        </FormGroup>
        <FormGroup row>
          <FormControlLabel
            control={
              <Checkbox
                checked={this.state.checkedB}
                onChange={this.handleChange('checkedB')}
                value="checkedB"
              />
            }
            label="Simon"
          />
        </FormGroup>
        <FormGroup row>
          <FormControlLabel
            control={
              <Checkbox
                checked={this.state.checkedC}
                onChange={this.handleChange('checkedC')}
                value="checkedC"
              />
            }
            label="Simba"
          />
        </FormGroup>
        <FormGroup row>
          <FormControlLabel
            control={
              <Checkbox
                checked={this.state.checkedD}
                onChange={this.handleChange('checkedD')}
                value="checkedD"
              />
            }
            label="All"
          />
        </FormGroup>
        </Paper>
      </div>
    );
  }
}

export default QuizCard;
