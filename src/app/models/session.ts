import {TypeSession} from "../enumerations/type-session";
import {Semestre} from "./semestre";

export interface Session {
  idSession?:number;
  typeSession?:TypeSession;
  semestres?:Array<Semestre>;
}
