import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Activity, Calculo, Category } from '../interfaces/activities.interfaces';

@Injectable({
  providedIn: 'root'
})
export class CaloriesCounterService {

  private activities: Activity[] = [];   // en esta variable se reciben los datos del componente counter
  private dataSubject = new Subject<Activity[]>(); // Observable - para poder enviar datos
  private dataSubjectActivity = new Subject<Activity>();
  private dataSubjectCalculo = new Subject<Calculo>();
  private banderaEdit: boolean = false;



  constructor() { }

  getObservableActivities(): Observable<Activity[]> {   // Se crea esta funcion para poder enviar datos a otro componente
    return this.dataSubject.asObservable()
  }

  getObservableActivitiesCalculo(): Observable<Calculo> {   // Se crea esta funcion para poder enviar datos a otro componente
    return this.dataSubjectCalculo.asObservable()
  }

  getObservableActivitiesEdit(): Observable<Activity> {   // Se crea esta funcion para poder enviar datos a otro componente
    return this.dataSubjectActivity.asObservable()
  }

  newsActivites(activities: Activity) {       // en esta funcion se reciben los datos y se insertan en el arreglo
    this.activities.push(activities);
    this.dataSubject.next(this.activities)  // esta linea va a saber cuando hay un nuevo cambio y se lo notifica a todos los componentes q esta suscritos
  }

  deleteActivity(id: number): void {
    let indice = 0

    for (let a = 0; a < this.activities.length; a++) {
      if (this.activities[a].id == id) {
        indice = a
        break;

      }
    }

    this.activities.splice(indice, 1)
    this.dataSubject.next(this.activities)
    this.calculateActivities()

  }


  editActivity(): boolean {
    return this.banderaEdit
  }


  setActivityForEdit(activity: Activity) {

    this.banderaEdit = true
    this.dataSubjectActivity.next(activity)
  }


  updateActivity(id: number,
    category: Category,
    nameActivity: string,
    calories: number,
  ) {


    let resp = this.activities.findIndex(obj => obj.id === id);
    this.activities[resp].calories = calories,
      this.activities[resp].category = category,
      this.activities[resp].nameActivity = nameActivity
    this.dataSubject.next(this.activities)
    this.banderaEdit = false
  }


  calculateActivities() {

    let sumaComida = 0
    let sumaEjercicios = 0
    let diferencia = 0

    for (let a= 0; a < this.activities.length ; a++) {

     if( this.activities[a].category?.id==1 ){
      sumaComida += this.activities[a].calories
     }else{
      sumaEjercicios += this.activities[a].calories
     }

    }

    diferencia=sumaComida-sumaEjercicios

    let acitivityCalculos: Calculo = {
      sumaComida :sumaComida,
      sumaEjercicios :sumaEjercicios,
      diferencia :diferencia,
    };

    this.dataSubjectCalculo.next(acitivityCalculos)


  }

  reseteActivities(){

    this.activities = [];
   this.calculateActivities()
   this.banderaEdit=false
   this.dataSubject.next(this.activities)


  }


  getActivitiesBottonReset(){
    return  this.activities
  }



}
