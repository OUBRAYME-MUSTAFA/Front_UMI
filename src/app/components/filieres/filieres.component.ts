import {Component, ElementRef, OnInit} from '@angular/core';
import {Filiere} from "../../models/filiere";
import {FiliereService} from "../../services/filiere.service";
import {ActivatedRoute} from "@angular/router";
import {NgForm} from "@angular/forms";

@Component({
  selector: 'app-filieres',
  templateUrl: './filieres.component.html',
  styleUrls: ['./filieres.component.css']
})
export class FilieresComponent implements OnInit {

  filieres: Filiere[] = [];
  filiere: Filiere = {};
  editForm = false;
  id?:number;
  idEtablissement:string | null = '';

  constructor(private  filiereService: FiliereService, private activedRoute:ActivatedRoute) { }

  ngOnInit(){
    this.idEtablissement = this.activedRoute.snapshot.paramMap.get('idEtablissement');
    if(this.idEtablissement){
      this.getFilieres();
    }else {
      this.getAllFilieres();
    }

  }

  getFilieres(){
    this.filiereService.findAll(this.idEtablissement)
      .subscribe(filieres =>{
        this.filieres = filieres;
      });
  }

  getAllFilieres(){
    this.filiereService.findFilieres()
      .subscribe(filieres =>{
        this.filieres = filieres;
      });
  }

  deleteFiliere(){
    this.filiereService.delete(this.id)
      .subscribe(()=>{
        this.filieres = this.filieres.filter(filiere => filiere.id != this.id);
      });
  }

  confirme(id?: number){
    this.id = id;
  }

  addFiliere(filiereForm:NgForm){
    filiereForm.resetForm();
    this.filiere = {};
    this.editForm = false;
  }

  persistFiliere(){
    this.filiereService.persist(this.filiere)
      .subscribe((filiere)=>{
        this.filieres = [filiere, ...this.filieres];
        this.filiere = {};
      });
  }

  editFiliere(filiere:Filiere){
    this.filiere = filiere;
    this.editForm = true;
  }

  updateFiliere(){
    this.filiereService.update(this.filiere)
      .subscribe(filiere => {
        this.filiere = {};
        this.editForm =false;
      })
  }

}
