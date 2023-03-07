import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Etablissement} from "../models/etablissement";
import {Departement} from "../models/departement";

@Injectable({
  providedIn: 'root'
})
export class EtablissementService {

  // hostEtablissement = environment.host+"/SERVICE-ETABLISSEMENT";
  hostEtablissement = "http://localhost:7080"
  constructor(private http: HttpClient) { }

  findAllEtablissements(){
    return this.http.get<Etablissement[]>(`${this.hostEtablissement}/etablissements`);
  }

  findAllDepartements(id?:string|null){
    return this.http.get<Departement[]>(`${this.hostEtablissement}/${id}/departements`);
  }

  deleteEtablissement(id?:number){
    return this.http.delete(`${this.hostEtablissement}/etablissements/${id}`);
  }

  deleteDepartement(id?:number){
    return this.http.delete(`${this.hostEtablissement}/departements/${id}`);
  }

  persistEtablissement(etablissement:Etablissement,logo:File|null){
    const formData = new FormData();
    formData.append(
      'etablissement',
      new Blob([JSON.stringify(etablissement)],{type:'application/json'})
    );
    // @ts-ignore
    formData.append('logo',logo);
    return this.http.post<Etablissement>(`${this.hostEtablissement}/test`,formData);
  }

  persistDepartement(id?:string|null, departement?:Departement){
    return this.http.post<Departement>(`${this.hostEtablissement}/${id}/departements`,departement);
  }

  updateEtablissement(etablissement:Etablissement){
    return this.http.put(`${this.hostEtablissement}/etablissements/${etablissement.id}`,etablissement);
  }

  updateDepartement(departement:Departement){
    return this.http.put(`${this.hostEtablissement}/departements`,departement);
  }

  public createImg(etablissement: Etablissement){
    const img:any = etablissement.logo;
    etablissement.logo = 'data:image/jpeg;base64,'+img;
    return etablissement;
  }
}
