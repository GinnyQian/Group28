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
  selectedQuestion: Question | undefined;
  curQuestion: Question = this.questions[1];
  constructor() {
  }

  ngOnInit(): void {
  }

  onSelect(question: Question): void {
  this.selectedQuestion = question;
  }


}
