import { Component, OnInit } from '@angular/core';
import { QUESTIONS } from '../mock-questions';
import { Question } from '../question';


@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit {
  questions = QUESTIONS;
  selectedChoice: string | undefined;
  questionIdx = 0;
  curQuestion: Question = this.questions[this.questionIdx];
  constructor() {
  }

  ngOnInit(): void {
  }

  onSelect(choiceNumber: string): void {
    this.selectedChoice = choiceNumber;
    if (this.selectedChoice !== this.curQuestion.answer){
      console.log('wrong answer');
      // this.curQuestion.choice4 = 'wrong answer';
    }else{
      console.log('right answer');
      // this.curQuestion.choice4 = 'wrong answer';
    }

    this.nextQuestion();
  }

  nextQuestion(): void {
    if (this.questionIdx < QUESTIONS.length){
      this.curQuestion = QUESTIONS[this.questionIdx++];
    }
  }

}
