import { Component, OnInit } from '@angular/core';
import { QUESTIONS } from '../mock-questions';
import { Question } from '../question';
import { Router } from '@angular/router';


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
  curScore = 0;
  haveChoose = '0';
  constructor( private router: Router) {
  }

  ngOnInit(): void {

  }

  onSelect(choiceNumber: string): void {
    this.selectedChoice = choiceNumber;
    this.haveChoose = '1';
    if (this.selectedChoice !== this.curQuestion.answer){
      console.log('wrong answer');
      // this.curQuestion.choice4 = 'wrong answer';
    }else{
      console.log('right answer');
      this.curScore += 10;
      // this.curQuestion.choice4 = 'wrong answer';
    }
    setTimeout(() => {
      this.nextQuestion();
    }, 1000);
  }

  nextQuestion(): void {
    if (this.questionIdx === QUESTIONS.length){
      setTimeout(() => {
        this.router.navigate(['/end']).then(r => {});
      }, 1000);
    }
    if (this.questionIdx < QUESTIONS.length){
      this.curQuestion = QUESTIONS[this.questionIdx++];
      this.haveChoose = '0';
      this.selectedChoice = 'nul';
    }
  }

}
