import {Type} from "../enumerations/type";
import {Semestre} from "./semestre";

export interface TypeSemestre {

  id?:number;
  typeSemester?:Type;
  semestres?:Array<Semestre>;
}
