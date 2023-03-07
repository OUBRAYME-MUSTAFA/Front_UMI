import { Injectable } from '@angular/core';
import {Article} from "../models/article";
import {Journaliste} from "../models/journaliste";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class JournalService {

  hostJournal = environment.host+"/SERVICE-JOURNAL";

  constructor(private http: HttpClient) { }

  findAllJournaliste(){
    return this.http.get<Journaliste[]>(`${this.hostJournal}/journalistes`);
  }

  findAllArticle(){
    return this.http.get<Article[]>(`${this.hostJournal}/articles`);
  }

  findArticles(id:string|null){
    return this.http.get<Article[]>(`${this.hostJournal}/articles/idJournaliste/${id}`);
  }

  persistJournaliste(journaliste:Journaliste){
    return this.http.post<Journaliste>(`${this.hostJournal}/ajouterJournaliste`,journaliste);
  }

  persistArticle(article:Article, contenuArticle:File | null){
    const formData = new FormData();
    formData.append(
      'article',
      new Blob([JSON.stringify(article)],{type:'application/json'})
    );
    // @ts-ignore
    formData.append('contenuArticle',contenuArticle);
    return this.http.post<Journaliste>(`${this.hostJournal}/ajouterArticle`,formData);
  }

  updateJournaliste(journaliste:Journaliste){
    return this.http.put(`${this.hostJournal}/modifieJournaliste`,journaliste);
  }

  updateArticle(article:Article, contenuArticle:File | null){
    const formData = new FormData();
    formData.append(
      'article',
      new Blob([JSON.stringify(article)],{type:'application/json'})
    );
    // @ts-ignore
    formData.append('contenuArticle',contenuArticle);
    return this.http.put(`${this.hostJournal}/modifieArticle`,formData);
  }

  deleteJournaliste(id?:number){
    return this.http.delete(`${this.hostJournal}/journalistes/${id}`);
  }

  deleteArticle(id?:number){
    return this.http.delete(`${this.hostJournal}/supprimerArticle/${id}`);
  }

  getContenu(id?:number){
    return this.http.get(`${this.hostJournal}/downloadContenu/${id}`);
  }
}
