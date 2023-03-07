import {Session} from "./session";
import {FiliereAnneeUniversitaire} from "./filiere-annee-universitaire";

export interface AnneeUniversitaire {
  idAnneeUniversitaire?:number;
  nomAnneeUniversitaire?:string;
  sessions?:Array<Session>;
  filieres?:Array<FiliereAnneeUniversitaire>;
}
