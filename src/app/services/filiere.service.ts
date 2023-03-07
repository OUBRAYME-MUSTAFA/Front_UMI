import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";
import {Filiere} from "../models/filiere";

@Injectable({
  providedIn: 'root'
})
export class FiliereService {

  // hostFiliere = environment.host+"/SERVICE-STRUCTURE-ENSEIGNEMENT";
  hostFiliere = environment.host;

  constructor(private http: HttpClient) { }

  findAll(id:string|null){
    return this.http.get<Filiere[]>(`${this.hostFiliere}/filieres/idEtablissement/${id}`);
  }

  findFilieres(){
    return this.http.get<Filiere[]>(`${this.hostFiliere}/filieres`);
  }

  delete(id?:number){
    return this.http.delete(`${this.hostFiliere}/supprimerFilliere/${id}`);
  }

  persist(filiere:Filiere){
    return this.http.post<Filiere>(`${this.hostFiliere}/ajouterFiliere`,filiere);
  }

  update(filiere:Filiere){
    return this.http.put(`${this.hostFiliere}/modifierFiliere`,filiere);
  }
}
