import React, { Component } from 'react';
import Radio, { RadioGroup } from 'material-ui/Radio';
import { FormLabel, FormControl, FormControlLabel } from 'material-ui/Form';
import Button from 'material-ui/Button';
import firebase from '../globals/firebase';
import Colors from '../globals/Colors';
import Paper from 'material-ui/Paper';

const styles = {
  container: {
    backgroundColor: Colors.White,
    margin: '180px auto',
    width: 300,
    padding: 20,
  },
  textstyle: {
    color: Colors.Black,
    fontSize: 20,
    marginBottom: 10,
  },
  nextButton: {
    backgroundColor: Colors.Accent,
    marginTop: 10,
  }
}

export default class Quizcard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      question: '',
      correctanswer: '',
      a: '',
      b: '',
      c: '',
      d: '',
      disabled: true,
      value: null,
    };
  }

  handleChange = event => {
    let userValue = event.target.value;
    this.setState({ value: userValue });

    if (userValue) {
      this.setState({disabled: false})
    }

    if (userValue === this.state.correctanswer) {
      console.log('CORRECT')
    } else {
      console.log('WRONG!')
    }
  };

  handleClick = event => {

  };


  getQuestions = () => {
    let db = firebase.database();
    let ref = db.ref("questions");

    ref.on("value", (snapshot) => { snapshot.forEach((q) => {
      let value = q.val();
      let qa = {
        question: value.question,
        correctanswer: value.correctanswer,
        answers: value.answers,
      }
      console.log(qa);

      this.setState({question: qa.question})
      this.setState({correctanswer: qa.correctanswer})
      this.setState({a: qa.answers.a})
      this.setState({b: qa.answers.b})
      this.setState({c: qa.answers.c})
      this.setState({d: qa.answers.d})
    })
  })
}

  componentWillMount() {
    this.getQuestions();
  }

  render() {
    return (
      <Paper style={styles.container}>
      <FormControl component="fieldset">
        <FormLabel component="legend" style={styles.textstyle}>{this.state.question}</FormLabel>
        <RadioGroup value={this.state.value} onChange={this.handleChange} >
          <FormControlLabel value={this.state.a} control={<Radio />} label={this.state.a} />
          <FormControlLabel value={this.state.b} control={<Radio />} label={this.state.b} />
          <FormControlLabel value={this.state.c} control={<Radio />} label={this.state.c} />
          <FormControlLabel value={this.state.d} control={<Radio />} label={this.state.d} />
        </RadioGroup>
      </FormControl>
        <div>
          <Button
            style={styles.nextButton}
            size="small"
            variant="raised"
            color="secondary"
            disabled={this.state.disabled}
            onChange={this.handleChange}
            onClick={this.handleClick}>
            NEXT
          </Button>
        </div>
      </Paper>
    );
  }
}
