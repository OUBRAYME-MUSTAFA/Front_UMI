import {Type} from "../enumerations/type";

export class PlanningExamen {
  id?:number;
  nomFiliere?:string;
  session?:string;
  semestre?:string;
  typeExam?:Type;
  idAnneeUniversitaire?:number;
  AnneeUniversitaire?:string;
}
