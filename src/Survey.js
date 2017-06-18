import React, { Component } from 'react';

var firebase = require('firebase');
var uuid = require('uuid');

var config = {
    apiKey: "AIzaSyDyh4GPevNDQmy7nrPn38nLRPhzswGZcjs",
    authDomain: "react-survey-f5d5c.firebaseapp.com",
    databaseURL: "https://react-survey-f5d5c.firebaseio.com",
    projectId: "react-survey-f5d5c",
    storageBucket: "react-survey-f5d5c.appspot.com",
    messagingSenderId: "783206331570"
  };
  firebase.initializeApp(config);

class Survey extends Component {

	nameSubmit(event) {
		var studentName = this.refs.name.value;
		this.setState({studentName: studentName}, function() {
			console.log(this.state);
		});
	}
	answerSelected(event) {
		var answers = this.state.answers;
		if (event.target.name === 'answer1') {
			answers.answer1 = event.target.value;
		} else if (event.target.name === 'answer2') {
			answers.answer2 = event.target.value;
		} else if (event.target.name === 'answer3') {
			answers.answer3 = event.target.value;
		} else if (event.target.name === 'answer4') {
			answers.answer4 = event.target.value;
		} else if (event.target.name === 'answer5') {
			answers.answer5 = event.target.value;
		}
		this.setState({answers: answers}, function() {
			console.log(this.state);
		})
	}
	questionSubmit() {
		firebase.database().ref('reactSurvey/'+this.state.uid).set({
			studentName: this.state.studentName,
			answers: this.state.answers
		})
		this.setState({isSubmitted: true});
	}

	constructor(props){
		super(props);
	
		this.state = {
			uid: uuid.v1(),
			studentName: '',
			answers: {
				answer1: '',
				answer2: '',
				answer3: '',
				answer4: '',
				answer5: ''
			},
			isSubmitted: false
		};
		this.nameSubmit = this.nameSubmit.bind(this);
		this.answerSelected = this.answerSelected.bind(this);
		this.questionSubmit = this.questionSubmit.bind(this);
	}
	render() {
		var studentName;
		var questions;

		if (this.state.studentName === '' && this.state.isSubmitted === false) {
			studentName = <div>
				<h1>Hey Student, please let us know your name: </h1>
				<form onSubmit={this.nameSubmit}>
					<input className="namy" type="text" placeholder="Enter your name" ref="name" />
				</form>
			</div>;
			questions = '';
		} else if (this.state.studentName !== '' && this.state.isSubmitted === false) {
			studentName =  <h1>Welcome to Survey, {this.state.studentName}</h1>;
			questions = <div>
				<h2>Here are some questions: </h2>
				<form onSubmit={this.questionSubmit}>
					<div className="card">
						<label>What kind of the courses you like the most:</label> <br />
						<input type="radio" name="answer1" value="technology" onChange={this.answerSelected} /> Technology
						<input type="radio" name="answer1" value="design" onChange={this.answerSelected} /> Design
						<input type="radio" name="answer1" value="marketing" onChange={this.answerSelected} /> Marketing
					</div>
					<div className="card">
						<label>You are a:</label> <br />
						<input type="radio" name="answer2" value="student" onChange={this.answerSelected} /> Student
						<input type="radio" name="answer2" value="in-job" onChange={this.answerSelected} /> In-job
						<input type="radio" name="answer2" value="looking-job" onChange={this.answerSelected} /> Looking-job
					</div>
					<div className="card">
						<label>Is online learning helpful:</label> <br />
						<input type="radio" name="answer3" value="yes" onChange={this.answerSelected} /> Yes
						<input type="radio" name="answer3" value="no" onChange={this.answerSelected} /> No
						<input type="radio" name="answer3" value="maybe" onChange={this.answerSelected} /> Maybe
					</div>
					<div className="card">
						<label>Would you recommend this course to a friend?</label> <br />
						<input type="radio" name="answer4" value="yes" onChange={this.answerSelected} /> Yes
						<input type="radio" name="answer4" value="no" onChange={this.answerSelected} /> No
						<input type="radio" name="answer4" value="maybe" onChange={this.answerSelected} /> Maybe
					</div>
					<div className="card">
						<label>How did you find out about us?</label> <br />
						<input type="radio" name="answer5" value="friend" onChange={this.answerSelected} /> Friends
						<input type="radio" name="answer5" value="google" onChange={this.answerSelected} /> Google
						<input type="radio" name="answer5" value="other" onChange={this.answerSelected} /> Other
					</div>
					<input className="feedback-button" type="submit" value="submit" />
				</form>
			</div>;
		} else if (this.state.isSubmitted === true) {
			studentName = <h1>Thanks, {this.state.studentName}</h1>
		}
		return(
			<div>
				{studentName}
				---------------------
				{questions}
			</div>
		)
	}
}

export default Survey;