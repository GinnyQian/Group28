import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {PresentationComponent} from './presentation/presentation.component';
import {QuizComponent} from './quiz/quiz.component';

const routes: Routes = [
  {path: 'presentation', component: PresentationComponent},
  {path: 'quiz', component: QuizComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
