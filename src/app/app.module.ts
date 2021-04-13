import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PresentationComponent } from './presentation/presentation.component';

import { QuizComponent } from './quiz/quiz.component';
import {HttpClientModule} from '@angular/common/http';
import {QuizService} from './quiz.service';
import {ChartsModule} from 'ng2-charts';

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
    QuizComponent
  ],
  imports: [
    BrowserModule,
    // import some module
    // FormsModule,
    AppRoutingModule,
    HttpClientModule,
    ChartsModule,
    // RouterModule.forRoot(ROUTES)
  ],
  providers: [QuizService],
  bootstrap: [AppComponent]
})
export class AppModule { }
