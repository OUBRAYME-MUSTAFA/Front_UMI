import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Formation } from '../models/formation';
import { map } from "rxjs/operators";
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FormationService {

  apiUrl = "http://localhost:8091";

  constructor(private http: HttpClient)  { }

  findAll(){
    return this.http.get<Formation[]>(`${this.apiUrl}/fullFormations`);
  }
  delete(id: any){
    return this.http.delete(`${this.apiUrl}/formations/${id}`);
  }

  persist(formation:any , document:File|null , image:File|null){
    const Data_form = new FormData();
    Data_form.append(
      'formation',
      new Blob([JSON.stringify(formation)],{type:'application/json'})
    );
    // @ts-ignore
    Data_form.append('document',document);
    // @ts-ignore
    Data_form.append('image',image);
    console.log("***************************************")
    console.log(Data_form)
    return this.http.post<Formation> (`${this.apiUrl}/addFormation`, Data_form)
  }

  updateFormation(formation:any , document:File|null  , image:File|null ){
    const Data_form = new FormData();
    Data_form.append(
      'formation',
      new Blob([JSON.stringify(formation)],{type:'application/json'})
    );
    if(document && image){
      // @ts-ignore
      Data_form.append('document',document);
      // @ts-ignore
      Data_form.append('image',image);
      return this.http.put<Formation> (`${this.apiUrl}/updateFormation`,Data_form)
    }else if(document){
      // @ts-ignore
      Data_form.append('document',document);
      return this.http.put<Formation> (`${this.apiUrl}/updateFormation1`,Data_form)
    }else if(image){
      // @ts-ignore
      Data_form.append('image',image);
      return this.http.put<Formation> (`${this.apiUrl}/updateFormation2`,Data_form)
    }else {
      return this.http.put<Formation> (`${this.apiUrl}/updateFormation3`,Data_form)
    }
  }

  getDocument(id?:number){

    return this.http.get(`${this.apiUrl}/downloadDoc/${id}`);
  }

  getImage(id?:number){
    return this.http.get(`${this.apiUrl}/downloadImg/${id}`);
  }
  // public createImg(formation: Formation){
  //   const img:any = formation.image;
  //   formation.image = 'data:image/jpeg;base64,'+img;
  //   return formation;
  // }
  


downloadFile( projectId?: number): any{
  return this.http.get(`${this.apiUrl}/downloadDoc/${projectId}`).pipe(map((response)=>{
        return {
            filename: 'yourFileName.pdf',
            data: response
        };
    }));
}
downloadImageBytes(id : number) : Observable<Blob>{
  var authorization = 'Bearer '+sessionStorage.getItem("access_token");

  const headers = new HttpHeaders({ 'Content-Type': 'application/json',
    "Authorization": authorization, responseType : 'blob'});

  return this.http.get<Blob>(this.apiUrl+"/downloadByteImg/"+id, { headers : headers,responseType :
      'blob' as 'json'});
}

downloadDocumentBytes(id : number) : Observable<Blob>{
  var authorization = 'Bearer '+sessionStorage.getItem("access_token");

  const headers = new HttpHeaders({ 'Content-Type': 'application/json',
    "Authorization": authorization, responseType : 'blob'});

  return this.http.get<Blob>(this.apiUrl+"/downloadByteDoc/"+id, { headers : headers,responseType :
      'blob' as 'json'});
}
}
