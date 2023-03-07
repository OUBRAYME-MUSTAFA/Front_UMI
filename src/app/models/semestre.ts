import {TypeSemestre} from "./type-semestre";

export interface Semestre {

  idSemestre?:number;
  nomSemestre?:string;
  idFiliere?:number;
  typeSemestres?:Array<TypeSemestre>;
}
