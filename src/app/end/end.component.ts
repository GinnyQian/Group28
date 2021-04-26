import { Component, Input, OnInit } from '@angular/core';
import { GameComponent} from '../game/game.component';
import {DataService} from '../data.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-end',
  templateUrl: './end.component.html',
  styleUrls: ['./end.component.css']
})
export class EndComponent implements OnInit {
  curScore = 0;
  constructor( private dataService: DataService) {
    this.curScore = dataService.getScore();
  }

  ngOnInit(): void {
  }

}
