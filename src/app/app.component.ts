import { Component } from '@angular/core';
import { CaloriesCounterService } from './services/calories-counter.service';
import { Activity } from './interfaces/activities.interfaces';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Calories-counter';



  constructor(
    private caloriesCounterService: CaloriesCounterService
  ) { }

  reseteActivities(){
    this.caloriesCounterService.reseteActivities()
  }



  getActivitiesBottonReset(){
  return this.caloriesCounterService.getActivitiesBottonReset()
  }
















}
