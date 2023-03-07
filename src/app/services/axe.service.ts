import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Axe } from '../models/axe';
@Injectable({
  providedIn: 'root'
})
export class AxeService {

  apiUrl = "http://localhost:8090";
  constructor(private http: HttpClient) { }

  findAll(){
    return this.http.get<Axe[]>(`${this.apiUrl}/axes`);
  }

  delete(id: any){
  return this.http.delete(`${this.apiUrl}/axe/${id}`);
  }

  persist(axe:any){
    return this.http.post<Axe> (`${this.apiUrl}/addAxe`,axe)
  }

  updateAxe(axe:Axe){
    return this.http.put(`${this.apiUrl}/updateAxe`,axe)
  }
}
