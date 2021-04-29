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
    // tslint:disable-next-line:prefer-const one-variable-per-declaration
    let element = document.getElementsByTagName('tag'), index;
    for (index = element.length - 1; index >= 0; index--) {
      // @ts-ignore
      element[index].parentNode.removeChild(element[index]);
    }
    this.retrieveData();
    setTimeout(() => {
      this.nextQuestion();
    }, 800);
  }

  ngOnInit(): void {
  }

  retrieveData(): void {
    console.log('receive data');
    this.dataService.getAll().subscribe(
       data => {
        this.questionsFromServer = data;
      },
      error => {
        console.log(error);
      });
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
    }
    setTimeout(() => {
      this.nextQuestion();
    }, 800);
  }

  nextQuestion(): void {
    if (this.questionIdx === this.questionsFromServer?.length){
      setTimeout(() => {
        this.dataService.curScore = this.curScore;
        this.router.navigate(['/end']).then(r => {});
      }, 800);
    }else if (this.questionsFromServer != null){
      this.curQuestion = this.questionsFromServer[this.questionIdx++];
      this.haveChoose = '0';
      this.selectedChoice = 'nul';
    }
  }

}
