import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {AnneeUniversitaire} from "../models/annee-universitaire";
import {Semestre} from "../models/semestre";

@Injectable({
  providedIn: 'root'
})
export class AnneeUniversitaireService {

  hostAnnee = environment.host+"/SERVICE-ANNEE-UNIVERSITAIRE";

  constructor(private http:HttpClient) { }

  getAnneeUniversitaire(id?:number){
    return this.http.get<AnneeUniversitaire>(`${this.hostAnnee}/anneeUniversitaire/${id}`);
  }

  getAnneeUniversitaire1(id?:number){
    return this.http.get<AnneeUniversitaire>(`${this.hostAnnee}/anneeUniversitaires/${id}`);
  }

  getAUCourante(){
    return this.http.get<AnneeUniversitaire>(`${this.hostAnnee}/anneeUniversitaireCourante`);
  }

  getSemestre(id?:number,typeSession?:string, nomFiliere?:string){
    return this.http.get<Semestre[]>(`${this.hostAnnee}/${id}/semestres/${typeSession}/${nomFiliere}`)
  }
}
