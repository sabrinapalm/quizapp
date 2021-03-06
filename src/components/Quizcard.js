import React, { Component } from 'react';
import Radio, { RadioGroup } from 'material-ui/Radio';
import { FormLabel, FormControl, FormControlLabel } from 'material-ui/Form';
import Button from 'material-ui/Button';
import firebase from '../globals/firebase';
import Colors from '../globals/Colors';

const styles = {
  container: {
    backgroundColor: Colors.White,
    border: '2px solid',
    borderColor: Colors.Accent,
    margin: '10px auto',
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
  },
  correctAnswerStyle: {
    color: 'green',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  wrongAnswerStyle: {
    color: 'red',
    textAlign: 'center',
    marginTop: -10,
    fontWeight: 'bold',
  }
}

export default class Quizcard extends Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this)
    this.fetchQuestions = this.fetchQuestions.bind(this)
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
      currentScore: 0,
      current: 0,
      showAnswer: false,
      showWrongAnswer: false,
      newName: 'JONNY'
    };
  }

componentDidMount() {
  this.fetchQuestions();
}

componentWillUnmount() {
  this.unsubscribeFetchQuestions();
}



snapshotFunc = (snapshot) => {
  snapshot.forEach((q) => {
    let value = q.val();
    let qa = {
      question: value.question,
      correctanswer: value.correctanswer,
      answers: value.answers
    }
    this.setState({ myQuestions: [...this.state.myQuestions, qa] })
  })
}

fetchQuestions = () => {
  let db = firebase.database();
  let ref = db.ref("questions");
  ref.once("value", this.snapshotFunc);
}

unsubscribeFetchQuestions = () => {
  let db = firebase.database();
  let ref = db.ref("questions");
  ref.off("value", this.snapshotFunc);
}

getCurrentScore = () => {
  let userId = this.props.user.uid;
  firebase.database().ref('/users/' + userId).once('value').then((snapshot) => {
    let result = snapshot.val();
    this.setState({currentScore: result.quizscore})
  })
}

startQuiz = event => {
  this.getCurrentScore();
  const list = this.state.myQuestions;
  if (this.state.current > list.length ) {
    this.setState({
      current: 0,
      currentQuestion: 0
    })
  } else {
    let i = this.state.current;
    if( list[i] ) {
      this.setState({
        current: this.state.current + 1,
        start: !true,
        started: true,
        showAnswer: false,
        showWrongAnswer: false,
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
    if(this.state.current === 4) {
      this.setState({finished: true})
      this.props.finished(this.state.finished, this.state.score);
    }
  }
};


handleChange = (event) => {
  let userId = this.props.user.uid;
  const listLength = this.state.myQuestions.length;
  let userValue = event.target.value;
  this.setState({ value: userValue });

  if (userValue === this.state.correctanswer) {
    this.setState({
      start: true,
      showAnswer: true,
      score: this.state.score + 10
    })
  } else {
    this.setState({
      start: true,
      showWrongAnswer: true,
    })
  }

  if (this.state.currentQuestion < listLength - 1) {
    this.setState({currentQuestion: this.state.currentQuestion + 1})
  } else {
    let totalScore = this.state.currentScore + this.state.score;
    firebase.database().ref('/users/' + userId).update({ quizscore: totalScore });
    this.setState({finished: true})
  }
};

handleClick = () => {
  if (this.state.finished === true) {
    this.setState({
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
      currentScore: 0,
      showAnswer: false,
      showWrongAnswer: false,
    })
  }
  this.startQuiz();
};


render() {
    return (
      <div style={styles.container}>
      {(this.state.showAnswer) ? <p style={styles.correctAnswerStyle}>RÄTT + 10</p> : <p /> }
      {(this.state.showWrongAnswer) ? <p style={styles.wrongAnswerStyle}>FEL Rätt svar är {this.state.correctanswer}</p> : <p /> }
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
      </div>
    );
  }
}
