import { Module } from "./module";

export class Filiere {
    id?:number;
    nomFilier?:string;
    nombreAnnees?:number;
    nombreSemestres?:number;
    modules?:Array<Module>;
    anneesDiplomante?:number;
    anneesNonDiplomante?:number;
    idEtablissement?:number;
    responsableFiliere?:string;

}
