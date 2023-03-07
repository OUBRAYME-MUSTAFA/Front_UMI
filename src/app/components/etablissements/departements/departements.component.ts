import {Component, OnInit} from '@angular/core';
import {Departement} from "../../../models/departement";
import {EtablissementService} from "../../../services/etablissement.service";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-departements',
  templateUrl: './departements.component.html',
  styleUrls: ['./departements.component.css']
})
export class DepartementsComponent implements OnInit {

  departements: Departement[] = [];
  departement: Departement = {};
  editForm = false;
  id?:number;
  idEtablissement?:string | null;

  constructor(private departementService: EtablissementService, private activedRoute:ActivatedRoute) { }

  ngOnInit() {
    this.idEtablissement = this.activedRoute.snapshot.paramMap.get('idEtablissement');
    this.getDepartements();
  }

  getDepartements(){
    this.departementService.findAllDepartements(this.idEtablissement)
      .subscribe(departements => {
        this.departements = departements;
      });

  }

  addDepartement(){
    this.departement = {};
    this.editForm = false;
  }

  persistDepartement(){
    this.departementService.persistDepartement(this.idEtablissement,this.departement)
      .subscribe(departement =>{
        this.departements = [departement, ...this.departements];
        this.departement = {};
      });
  }

  editDepartement(departement:Departement){
    this.departement = departement;
    this.editForm = true;
  }

  udateDepartement(){
    this.departementService.updateDepartement(this.departement)
      .subscribe(departement =>{
        this.departement = {};
        this.editForm = false;
      });
  }

  deleteDepartement(){
    this.departementService.deleteDepartement(this.id)
      .subscribe(()=>{
        this.departements = this.departements.filter(departement => departement.id != this.id);
      })
  }

  confirme(id:number | undefined){
    this.id = id;
  }
}
