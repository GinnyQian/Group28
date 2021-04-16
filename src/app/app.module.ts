import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {HttpClientModule} from '@angular/common/http';
import {ChartsModule} from 'ng2-charts';
import {FormsModule} from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PresentationComponent } from './presentation/presentation.component';
import { EndComponent } from './end/end.component';
import { QuizComponent } from './quiz/quiz.component';
import { GameComponent } from './game/game.component';


import {QuizService} from './quiz.service';
import {DataService} from './data.service';

// define the routes
const ROUTES = [
  {
    path: '',
    redirectTo: 'quiz',
    pathMath: 'full'
  },
  {
    path: 'quiz',
    component: QuizComponent
  }
];
@NgModule({
  declarations: [
    AppComponent,
    PresentationComponent,
    QuizComponent,
    GameComponent,
    EndComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ChartsModule,
    FormsModule,
  ],
  providers: [QuizService, DataService],
  bootstrap: [AppComponent]
})
export class AppModule { }
