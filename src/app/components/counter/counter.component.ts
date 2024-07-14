import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Activity, Category } from 'src/app/interfaces/activities.interfaces';
import { CaloriesCounterService } from 'src/app/services/calories-counter.service';

@Component({
  selector: 'app-counter',
  templateUrl: './counter.component.html',
  styleUrls: ['./counter.component.css']
})

export class CounterComponent implements OnInit {


  public id: number = 1;  // variable para agregar el id dinamico

  public categories: Category[] = [
    { id: 1, name: 'Comida', selected: false },
    { id: 2, name: 'Ejercicio', selected: false }

  ]

  public myForm: FormGroup = this.fb.group({   // datos que se reciben del formulario y validaciones
    id: 0,
    category: ['', [Validators.required]],
    nameActivity: ['', [Validators.required]],
    calories: ['', [Validators.required]]

  })


  constructor(private fb: FormBuilder,
    private caloriesCounterService: CaloriesCounterService,
  ) { }


  ngOnInit(): void {
    this.caloriesCounterService.getObservableActivitiesEdit()
      .subscribe(
        resultado => {
          this.myForm.setValue({
            id: resultado.id,
            category: resultado.category?.id,
            nameActivity: resultado.nameActivity,
            calories: resultado.calories

          })
          let category = this.categories.findIndex(obj => obj.id === resultado.category?.id);
          this.categories[category].selected = true
        }

      )
  }


  searchCategory(id:string){
    let category = parseInt(id)
    const index = this.categories.findIndex(obj => obj.id === category)

   return this.categories[index]
  }


  public onSubmit() {                                             // funcion que recibe los datos del formulario
    this.myForm.markAllAsTouched();

    if (this.caloriesCounterService.editActivity() == false) {   //pregunta si puede editar si no puede entonces guarda


      let activity: Activity = {                  // se crea una variable  de tipo actividada en la cual se van a recibir los valores del formulario
        id: this.id,
        category: this.searchCategory(this.myForm.get('category')!.value),
        nameActivity: this.myForm.get('nameActivity')!.value,
        calories: this.myForm.get('calories')!.value,
      }

      this.id += 1                                // se manipula el id para que sea consecutivo cada vez q se ingresa un nuevo registro

      this.caloriesCounterService.newsActivites(activity)  // se encia los datos al servicio para que posterior mente se reenvien al componente que los va a consumir *** importante newsAcitvites es la funcion especial que lo vuelve reactivo la que nos da la posibilidad de posteriormente consumir los datos desde otro componente

    } else {


      this.caloriesCounterService.updateActivity(
        parseInt(this.myForm.get('id')!.value),
       this.searchCategory(this.myForm.get('category')!.value),
        this.myForm.get('nameActivity')!.value,
        parseInt(this.myForm.get('calories')!.value),
      )

    }
    this.caloriesCounterService.calculateActivities()
    this.myForm.reset();

  }





}
