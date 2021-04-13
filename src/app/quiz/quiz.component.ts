import { Component, OnInit } from '@angular/core';
import { QuizService } from '../quiz.service';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.css']
})
export class QuizComponent implements OnInit {
  constructor(private quizService: QuizService) { }
  stats: any = [];
  // currentdata = null;
  currentIndex = -1;
  title = '';
  public radarChartLabels = [];
  public radarChartData = [
  ];
  public radarChartType = 'radar' as const;

  ngOnInit(): void {
    this.retrieveData();
  }
  retrieveData(): void {
    this.quizService.getALL().subscribe(
      data => {
        this.stats = data;
        this.radarChartData = this.stats.radarChartData;
        this.radarChartLabels = this.stats.radarChartLabels;
      }
  , error => {
      console.log(error);
    }
  );
  }

}
