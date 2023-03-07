import { Component, OnInit } from '@angular/core';
import {Journaliste} from "../../../models/journaliste";
import {JournalService} from "../../../services/journal.service";

@Component({
  selector: 'app-journalistes',
  templateUrl: './journalistes.component.html',
  styleUrls: ['./journalistes.component.css']
})
export class JournalistesComponent implements OnInit {

  journalistes:Journaliste[] = [];
  journaliste:Journaliste = {};
  editForm = false;
  id?:number;

  constructor(private journalService: JournalService) { }

  ngOnInit(): void {
    this.getJournalistes()
  }

  getJournalistes(){

    this.journalService.findAllJournaliste()
      .subscribe(journalistes =>{
        console.log(journalistes);
        this.journalistes = journalistes;
      });
  }

  addJournaliste(){
    this.journaliste = {};
    this.editForm = false;
  }

  persisteJournaliste(){
    this.journalService.persistJournaliste(this.journaliste)
      .subscribe(journaliste=>{
        this.journalistes = [journaliste,...this.journalistes];
        this.journaliste = {};
      })
  }

  editJournaliste(journaliste:Journaliste){
    this.journaliste = journaliste;
    this.editForm = true;
  }

  updateJournaliste(){
    this.journalService.updateJournaliste(this.journaliste)
      .subscribe(p=>{
        this.journaliste = {};
        this.editForm = false;
      });
  }

  confirme(id?: number){
    this.id = id;
  }

  deleteJournaliste(){
    this.journalService.deleteJournaliste(this.id)
      .subscribe(()=>{
        this.journalistes = this.journalistes
          .filter(journaliste => journaliste.id != this.id);
      });
  }

}
