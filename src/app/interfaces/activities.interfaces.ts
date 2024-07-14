export interface Category{
  id:number;
  name:string;
}

export interface Activity{
  id:number;
  category:Category | null;
  nameActivity:string;
  calories:number;
}


export interface Category{
  id:number;
  name:string;
  selected:boolean
}


export interface Calculo{

  sumaComida :number;
  sumaEjercicios :number;
  diferencia :number;
}
