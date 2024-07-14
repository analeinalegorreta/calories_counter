import { Component, OnInit } from '@angular/core';
import { Activity } from 'src/app/interfaces/activities.interfaces';
import { CaloriesCounterService } from 'src/app/services/calories-counter.service';

@Component({
  selector: 'app-food-activities',
  templateUrl: './food-activities.component.html',
  styleUrls: ['./food-activities.component.css']
})
export class FoodActivitiesComponent implements OnInit {

  public activities: Activity[] = [];

  constructor(
    private caloriesCounterService: CaloriesCounterService
  ) { }



  ngOnInit(): void {
    this.caloriesCounterService.getObservableActivities().subscribe(item=>{this.activities=item

      console.log(item)
    })
  }

  deleteActivity(id:number){
    this.caloriesCounterService.deleteActivity(id)
  }


  setActivityForEdit(id:Activity){
    this.caloriesCounterService.setActivityForEdit(id)
  }







  }


