import { Component, OnInit } from '@angular/core';
import {Article} from "../../../models/article";
import {JournalService} from "../../../services/journal.service";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-articles',
  templateUrl: './articles.component.html',
  styleUrls: ['./articles.component.css']
})
export class ArticlesComponent implements OnInit {

  articles:Article[] = [];
  article:Article = {};
  editForm = false;
  countenuArticle:File |null = null;
  id?:number;
  idJournaliste:string | null = '';

  constructor(private journalService: JournalService, private activedRoute:ActivatedRoute) { }

  ngOnInit(): void {
    this.idJournaliste = this.activedRoute.snapshot.paramMap.get('idJournaliste');
    if(this.idJournaliste){
      this.getArticlesOfJournaliste();
    }else{
      this.getArticles();
    }
  }

  getArticles(){
    this.journalService.findAllArticle()
      .subscribe(articles=>{
        this.articles = articles;
      });
  }

  getArticlesOfJournaliste(){
    this.journalService.findArticles(this.idJournaliste)
      .subscribe(articles=>{
        this.articles = articles;
      });
  }

  addArticle(){
    this.article = {};
    this.editForm = false;
  }

  persistArticle(){
    this.journalService.persistArticle(this.article,this.countenuArticle)
      .subscribe(article=>{
        this.articles = [article, ...this.articles];
        this.article = {};
      });
  }

  editArticle(article:Article){
    this.countenuArticle = null;
    this.article = article;
    this.editForm = true;
  }

  updateArticle(){
    this.journalService.updateArticle(this.article,this.countenuArticle)
      .subscribe(article=>{
        this.article = {};
        this.editForm = false;
      });
  }

  deleteArticle(){
    this.journalService.deleteArticle(this.id)
      .subscribe(()=>{
        this.articles = this.articles
          .filter(article=>this.article.id != this.id);
      });
  }

  selectArticle(event:any){
    this.countenuArticle = event.target.files[0];
  }

  confirme(id?: number){
    this.id = id;
  }

  downloadContenu(id?:number){
    this.journalService.getContenu(id).subscribe();
  }

}
