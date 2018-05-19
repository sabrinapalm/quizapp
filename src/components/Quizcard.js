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
    width: 400,
    padding: 20,
    color: Colors.Black,
  },
  textstyle: {
    color: Colors.Black,
    fontSize: 20,
    marginBottom: 10,
  },
  pstyle: {
    color: Colors.Black,
    float: 'right',
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
    this.handleChange = this.handleChange.bind(this)
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
      currentQuestion: 0,
      finished: false,
      score: 0,
      current: 0,
      showAnswer: false
    };
  }

  componentDidMount() {
    this.fetchQuestions();
  }

  componentWillUnmount() {
    this.fetchQuestions();
  }

  snapshotFunc = (snapshot) => { snapshot.forEach((q) => {
    let value = q.val();

    let qa = {
      question: value.question,
      correctanswer: value.correctanswer,
      answers: value.answers,
    }

    this.setState({ myQuestions: [...this.state.myQuestions, qa] })
  })
  }

  fetchQuestions = () => {
    let db = firebase.database();
    let ref = db.ref("questions");

    ref.on("value", this.snapshotFunc);
  }

  unsubscribeFetchQuestions = () => {
    let db = firebase.database();
    let ref = db.ref("questions");
    ref.off("value", this.snapshotFunc);
  }



  startQuiz = event => {
    const list = this.state.myQuestions;
    if (this.state.current > list.length ) {
      // this.props.tellParentWeFinishedTheQuiz
      console.log('finished quiz')

    } else {
      let i = this.state.current;
      if( list[i] ) {
        this.setState({
          current: this.state.current + 1,
          start: !true,
          started: true,
          question: list[i].question,
          a: list[i].answers.a,
          b: list[i].answers.b,
          c: list[i].answers.c,
          d: list[i].answers.d,
          correctanswer: list[i].correctanswer
        })
      } else {
        this.setState({
          current: this.state.current + 1,
        })
      }
    }
};


  handleChange = (event) => {
    const listLength = this.state.myQuestions.length;
    let userValue = event.target.value;
    this.setState({ value: userValue });

    if (userValue === this.state.correctanswer) {
      this.setState({
        start: true,
        score: this.state.score + 1
      })
      console.log('answer is correct!')
    } else {
      this.setState({start: true})
      console.log('answer is wrong!')
    }

    if (this.state.currentQuestion < listLength - 1) {
      this.setState({currentQuestion: this.state.currentQuestion + 1})
    } else {
      this.setState({finished: true})
    }
  };


  render() {
    const list = this.state.myQuestions;
    if(this.state.current > list.length) {
      return (
        <div style={styles.container}>
          Quiz fininshed! You got {this.state.score} points.
          <br />
          <Button
            style={styles.startquizButton}
            size="small"
            color="secondary"
            variant="raised">
            Redo
            </Button>
        </div>
      )
    }
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
          disabled={!this.state.start}
          onClick={this.startQuiz.bind(this)}>
          {!this.state.started ? 'START QUIZ' : 'NEXT'}
          </Button>
          <p style={styles.pstyle}>Fråga {this.state.current + '/' + this.state.myQuestions.length}</p>
        </div>
      </Paper>
    );
  }
}
