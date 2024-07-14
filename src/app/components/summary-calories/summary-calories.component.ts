import { Component, OnInit } from '@angular/core';
import { Calculo } from 'src/app/interfaces/activities.interfaces';
import { CaloriesCounterService } from 'src/app/services/calories-counter.service';

@Component({
  selector: 'app-summary-calories',
  templateUrl: './summary-calories.component.html',
  styleUrls: ['./summary-calories.component.css']
})
export class SummaryCaloriesComponent implements OnInit {

  public acitivityCalculos: Calculo = {
    sumaComida :0,
    sumaEjercicios :0,
    diferencia :0,
  };

  constructor(
    private caloriesCounterService: CaloriesCounterService,
  ) { }



  ngOnInit(): void {
    this.caloriesCounterService.getObservableActivitiesCalculo()
    .subscribe(
      resultado => this.acitivityCalculos=resultado

    )
  }

}
