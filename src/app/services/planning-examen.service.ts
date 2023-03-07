import { Injectable } from '@angular/core';
import {PlanningExamen} from "../models/planning-examen";
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class PlanningExamenService {

  hostPlanning = environment.host+"/SERVICE-PLANNING-EXAMEN";

  constructor(private http: HttpClient) { }

  findAll(){
    return this.http.get<PlanningExamen[]>(`${this.hostPlanning}/PlanningExamens`);
  }

  persist(planningExamen:PlanningExamen, avisFile:File|null, planningFile:File|null){
    const formData = new FormData();
    formData.append(
      'planning',
      new Blob([JSON.stringify(planningExamen)],{type:'application/json'})
    );
    // @ts-ignore
    fileFormData.append('avisExam',avisFile);
    // @ts-ignore
    fileFormData.append('planningExam',planningFile);
    return this.http.post<PlanningExamen>(`${this.hostPlanning}/ajouterPlanning`,formData);
  }

  delete(id?:number){
    return this.http.delete(`${this.hostPlanning}/supprimerPlanning/${id}`)
  }

  getAvisExamen(id?:number){
    return this.http.get(`${this.hostPlanning}/downloadAvis/${id}`);
  }

  getPlanningExamen(id?:number){
    return this.http.get(`${this.hostPlanning}/downloadPlanning/${id}`);
  }

  update(planningExamen:PlanningExamen, avisFile:File|null, planningFile:File|null){
    const formData = new FormData();
    formData.append(
      'planning',
      new Blob([JSON.stringify(planningExamen)],{type:'application/json'})
    );
    // @ts-ignore
    fileFormData.append('avisExam',avisFile);
    // @ts-ignore
    fileFormData.append('planningExam',planningFile);
    return this.http.put(`${this.hostPlanning}/modifierPlanning`,formData);
  }

}
