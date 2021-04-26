import { Component, Input, OnInit } from '@angular/core';
import { GameComponent} from '../game/game.component';

@Component({
  selector: 'app-end',
  templateUrl: './end.component.html',
  styleUrls: ['./end.component.css']
})
export class EndComponent implements OnInit {
  // tslint:disable-next-line:no-input-rename
  // @Input('curScore') curScore: number | undefined;
  constructor() { }

  ngOnInit(): void {
  }

}
