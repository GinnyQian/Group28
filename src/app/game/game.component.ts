import { Component, OnInit } from '@angular/core';
import { QUESTIONS } from '../mock-questions';
import { Question } from '../question';
import {Data, Router} from '@angular/router';
import { DataService} from '../data.service';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit {
  questions = QUESTIONS;
  // questions: Question[] | undefined;
  selectedChoice: string | undefined;
  questionsFromServer: Question[] | undefined;
  questionIdx = 0;
  curQuestion: Question = QUESTIONS[0];
  curScore = 0;
  haveChoose = '0';
  constructor( private router: Router, private dataService: DataService ) {
    this.retrieveData();
    setTimeout(() => {
      this.nextQuestion();
      // this.curQuestion.question = 'asdfasdfasfadsf';
    }, 800);
  }

  ngOnInit(): void {
  }

  retrieveData(): void {
    console.log('receive data');
    this.dataService.getAll().subscribe(
       data => {
        this.questionsFromServer = data;
        console.log(data[1].question);
        // now let's update the fields
      },
      error => {
        console.log(error);
      });
    console.log(this.questions[2].question);
    console.log('received');
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
    }, 800);
  }

  nextQuestion(): void {
    if (this.questionIdx === this.questionsFromServer?.length){
      setTimeout(() => {
        this.router.navigate(['/end']).then(r => {});
      }, 800);
    }else if (this.questionsFromServer != null){
      this.curQuestion = this.questionsFromServer[this.questionIdx++];
      this.haveChoose = '0';
      this.selectedChoice = 'nul';
    }else{
    }
  }

}
