import { Injectable } from '@angular/core';
import 'rxjs/operators';
import {HttpClient} from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class QuizService {

  private REST_API_SERVICE = 'http://localhost:3000/api/quiz';
  constructor(private httpClient: HttpClient) { }

  // Get all posts from the API
  public getALL(){
    return this.httpClient.get(this.REST_API_SERVICE);
  }
}
