import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Labo } from '../models/labo';

@Injectable({
  providedIn: 'root'
})
export class LaboService {

  apiUrl = "http://localhost:8090";

  constructor(private http: HttpClient)  { }

  findAll(){
    return this.http.get<Labo[]>(`${this.apiUrl}/fullLabos`);
  }
  delete(id: any){
    return this.http.delete(`${this.apiUrl}/labos/${id}`);
  }

  persist(labo:any){
    return this.http.post<Labo> (`${this.apiUrl}/addLabo`,labo)
  }

  updateLabo(labo:Labo){
    return this.http.put(`${this.apiUrl}/update`,labo)
  }
  addAxe(id:any,axe:any){
    return this.http.put(`${this.apiUrl}/labo/addAxe/${id}`,axe)
  }
}
