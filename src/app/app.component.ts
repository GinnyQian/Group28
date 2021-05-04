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
  curScore = 90;
  desc = 'mute';
  constructor( private router: Router) {
    this.router.navigate(['/presentation']);
    this.playMusic();
  }

  redirectTo(where: string): void {
    this.router.navigate([where]);
  }

  playMusic(): void{
    this.bgm.load();
    this.bgm.play();
  }
  stopMusic(): void{
    if (this.desc === 'mute'){
      this.bgm.pause();
      this.bgm.currentTime = 0;
      this.desc = 'unmute';
    }else{
      this.playMusic();
      this.desc = 'mute';
    }
  }
}
