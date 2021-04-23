import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-end',
  templateUrl: './end.component.html',
  styleUrls: ['./end.component.css']
})
export class EndComponent implements OnInit {

  // @Input() game: Game;
  // tslint:disable-next-line:no-input-rename
  @Input('game') curScore: number | undefined;
  constructor() { }

  ngOnInit(): void {
  }

}
