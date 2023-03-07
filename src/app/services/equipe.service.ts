import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Equipe } from '../models/equipe';

@Injectable({
  providedIn: 'root'
})
export class EquipeService {

  apiUrl = "http://localhost:8081";

  constructor(private http: HttpClient)  { }

  findAll(){
    return this.http.get<Equipe[]>(`${this.apiUrl}/fullEquipes`);
  }
  PureEquipes(){
    return this.http.get<Equipe[]>(`${this.apiUrl}/pureEquipes`);
  }
  delete(id: any){
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

  persist(equipe:any){
    return this.http.post<Equipe> (`${this.apiUrl}/addEquipe`,equipe)
  }

  updateLabo(equipe:Equipe){
    return this.http.put(`${this.apiUrl}/update`,equipe)
  }
  addAxe(id:any,axe:any){
    return this.http.put(`${this.apiUrl}/equipe/addAxe/${id}`,axe)
  }
}
