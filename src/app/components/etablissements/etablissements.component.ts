import {Component, Input, OnInit} from '@angular/core';
import {Etablissement} from "../../models/etablissement";
import {EtablissementService} from "../../services/etablissement.service";
import {map} from "rxjs";
import {NgForm} from "@angular/forms";

@Component({
  selector: 'app-etablissements',
  templateUrl: './etablissements.component.html',
  styleUrls: ['./etablissements.component.css']
})
export class EtablissementsComponent implements OnInit {

  etablissements: Etablissement[] = [];
  etablissement: Etablissement = {};
  editForm = false;
  id?:number;
  logo:File | null = null;

  constructor(private etablissementService: EtablissementService) { }

  ngOnInit(): void {
    this.getEtablissements();
  }

  getEtablissements(){
    this.etablissementService.findAllEtablissements()
      .pipe(
        map((x:Etablissement[],i)=> x.map((etablissement: Etablissement)=> this.etablissementService.createImg(etablissement)))
      )
      .subscribe(etablissements=>{
        this.etablissements = etablissements;
      });
  }

  addEtablissement(){
    this.etablissement = {};
    this.editForm = false;
  }

  persistEtablissement(etabForm:NgForm){
    this.etablissementService.persistEtablissement(this.etablissement,this.logo)
      .subscribe(etablissement=>{
        this.etablissements = [etablissement,...this.etablissements];
      });
    etabForm.reset();
    this.etablissement = {};
  }

  editEtablissement(etablissement:Etablissement){
    this.etablissement = etablissement;
    this.editForm = true;
  }

  updateEtablissement(){
    this.etablissementService.updateEtablissement(this.etablissement)
      .subscribe(etablissement=>{
        this.etablissement = {};
        this.editForm = false;
      });
  }

  deleteEtablissement(){
    this.etablissementService.deleteEtablissement(this.id)
      .subscribe(()=>{
        this.etablissements = this.etablissements.filter(etablissement => etablissement.id != this.id);
      });
  }

  confirme(id: number | undefined){
    this.id = id;
  }

  selectLogo(event:any){
    this.logo = event.target.files[0];
  }

}
