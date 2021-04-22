import { Component } from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Guide to the Solar system';
  bgm = new Audio('assets/bgm.mp3');
  curScore = 0;
  constructor( private router: Router) {
    // this.router.navigate(['/presentation']);
    this.playMusic();
  }

  redirectTo(where: string): void {
    console.log('redir');
    this.router.navigate([where]);
  }

  playMusic(): void{
    this.bgm.load();
    this.bgm.play();
  }
  stopMusic(): void{
    this.bgm.pause();
  }
}
