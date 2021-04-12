import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PresentationComponent } from './presentation/presentation.component';
import {FormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';

// define the routes
const ROUTES = [
  {
    path: '',
    redirectTo: 'presentation',
    pathMath: 'full'
  },
  {
    path: '',
    component: PresentationComponent
  }
];
@NgModule({
  declarations: [
    AppComponent,
    PresentationComponent
  ],
  imports: [
    BrowserModule,
    // import some module
    FormsModule,
    AppRoutingModule,
    RouterModule.forRoot(ROUTES)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
