import { Injectable, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { map, filter, switchMap } from 'rxjs/operators';
import {Question} from './question';
import {GameComponent} from './game/game.component';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private REST_API_SERVER = 'http://localhost:3000/api/game';

  constructor(private httpClient: HttpClient) { }

  public getAll(): Observable<Question[]>{
    return this.httpClient.get<Question[]>(this.REST_API_SERVER);
  }
}
