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
  startquizButton: {
    marginTop: 10,
  },
  nextButton: {
    backgroundColor: Colors.Accent,
    marginTop: 10,
    float: 'right',
  }
}

export default class Quizcard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      myQuestions: [],
      question: '',
      correctanswer: '',
      a: '',
      b: '',
      c: '',
      d: '',
      disabled: true,
      value: null,
      started: false,
      start: true,
    };
  }

  componentWillMount() {
    this.fetchQuestions();
  }

  fetchQuestions = () => {
    let db = firebase.database();
    let ref = db.ref("questions");

    ref.on("value", (snapshot) => { snapshot.forEach((q) => {
      let value = q.val();

      let qa = {
        question: value.question,
        correctanswer: value.correctanswer,
        answers: value.answers,
      }
      this.setState({ myQuestions: [...this.state.myQuestions, qa] })
    })
  })
}

startQuiz = event => {
  const list = this.state.myQuestions;
  this.setState({started: true});
  this.setState({start: !true});

  for (let i = 0; i < list.length; i++) {
    this.setState({question: list[i].question})
    this.setState({a: list[i].answers.a})
    this.setState({b: list[i].answers.b})
    this.setState({c: list[i].answers.c})
    this.setState({d: list[i].answers.d})
    this.setState({correctanswer: list[i].correctanswer})
  }
};


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


  render() {
    return (
      <Paper style={styles.container}>
      <FormControl component="fieldset">
        <FormLabel component="legend" style={styles.textstyle}>{this.state.question}</FormLabel>
        <RadioGroup value={this.state.value} onChange={this.handleChange.bind(this)} >
          <FormControlLabel disabled={this.state.start} value={this.state.a} control={<Radio />} label={this.state.a} />
          <FormControlLabel disabled={this.state.start} value={this.state.b} control={<Radio />} label={this.state.b} />
          <FormControlLabel disabled={this.state.start} value={this.state.c} control={<Radio />} label={this.state.c} />
          <FormControlLabel disabled={this.state.start} value={this.state.d} control={<Radio />} label={this.state.d} />
        </RadioGroup>
      </FormControl>
        <div>
        <Button
          style={styles.startquizButton}
          size="small"
          color="secondary"
          variant="raised"
          onClick={this.startQuiz.bind(this)}
          disabled={this.state.started}>
          START QUIZ
          </Button>
        </div>
      </Paper>
    );
  }
}
