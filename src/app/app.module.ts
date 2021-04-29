import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {HttpClientModule} from '@angular/common/http';
import {ChartsModule} from 'ng2-charts';
import {FormsModule} from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PresentationComponent } from './presentation/presentation.component';
import { EndComponent } from './end/end.component';
import { GameComponent } from './game/game.component';

import {DataService} from './data.service';


@NgModule({
  declarations: [
    AppComponent,
    PresentationComponent,
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
  providers: [DataService],
  bootstrap: [AppComponent]
})
export class AppModule { }
