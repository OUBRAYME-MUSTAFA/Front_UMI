import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Chercheur } from '../models/chercheur';
@Injectable({
  providedIn: 'root'
})
export class ChercheurService {

  apiUrl = "http://localhost:7777";
  constructor(private http: HttpClient) { }

  findAll(){
    return this.http.get<Chercheur[]>(`${this.apiUrl}/chercheur/prof`);
  }

  delete(id: any){
  return this.http.delete(`${this.apiUrl}/chercheurs/delete/${id}`);
  }

  persist(chercheur:any){
    return this.http.post<Chercheur> (`${this.apiUrl}/addChercheur`,chercheur)
  }
}
