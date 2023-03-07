import {Component, ElementRef, OnInit, Output} from '@angular/core';
import {PlanningExamen} from "../../models/planning-examen";
import {PlanningExamenService} from "../../services/planning-examen.service";
import {AnneeUniversitaireService} from "../../services/annee-universitaire.service";
import {AnneeUniversitaire} from "../../models/annee-universitaire";
import {Filiere} from "../../models/filiere";
import {Semestre} from "../../models/semestre";

@Component({
  selector: 'app-planning-examens',
  templateUrl: './planning-examens.component.html',
  styleUrls: ['./planning-examens.component.css']
})
export class PlanningExamensComponent implements OnInit {

  planningExamens:PlanningExamen[] = [];
  planningExamen:PlanningExamen = {};

  editForm = false;
  avisFile:File | null = null;
  planningFile:File | null = null;

  id?:number;
  annee:AnneeUniversitaire = {}; //
  nomAU?:string = '';
  filieres:Filiere[] = [];
  filiere:Filiere = {};
  sessions:string[] = [] ;
  semestres:Semestre[] = [];
  disabledSemestre:boolean = true;
  sessionEdit?:string;


  constructor(private plannigExamenService :PlanningExamenService,
              private  anneeUniversitaireService :AnneeUniversitaireService) { }

  ngOnInit(): void {
    this.getPlanningExamens();
  }

  getPlanningExamens(){
    this.plannigExamenService.findAll()
      .subscribe(planningExamens =>{
        planningExamens.forEach(p=> {
          this.anneeUniversitaireService.getAnneeUniversitaire(p.idAnneeUniversitaire)
            .subscribe(annee => {
              p.AnneeUniversitaire = annee.nomAnneeUniversitaire;
            });
        });
        this.planningExamens = planningExamens;
      });
  }

  addPlanning(){
    this.sessionEdit = '';
    this.planningExamen = {};
    this.filieres = [];
    this.sessions = [];
    this.semestres = [];
    this.editForm = false;

    this.anneeUniversitaireService.getAUCourante()
      .subscribe(au=>{
        this.nomAU = au.nomAnneeUniversitaire;
        this.planningExamen.idAnneeUniversitaire = au.idAnneeUniversitaire;
        this.planningExamen.AnneeUniversitaire = au.nomAnneeUniversitaire;
        au.filieres?.forEach(filiere =>{
          this.filieres = [...this.filieres,filiere.filiere];
        });
        au.sessions?.forEach(s=>{
          this.sessions = [s.typeSession+' - Ordinnaire',s.typeSession+' - Ratrrapage',...this.sessions];
        });
      });


  }

  onChange(event:any){
    let val = event.target.value.toString().split('-');
    this.planningExamen.session = val[0].trim();
    this.planningExamen.typeExam = val[1].trim();

    this.anneeUniversitaireService.getSemestre(this.planningExamen.idAnneeUniversitaire,val[0].trim(),this.planningExamen.nomFiliere)
      .subscribe(semestres=>this.semestres = semestres);
  }

  editPlanning(planningExamen:PlanningExamen){
    this.avisFile = null;
    this.planningFile = null;
    this.filieres = [];
    this.sessions = [];

    this.planningExamen = planningExamen;
    this.editForm = true;
    this.sessionEdit = `${this.planningExamen.session} - ${this.planningExamen.typeExam}`;
    this.anneeUniversitaireService.getAnneeUniversitaire1(this.planningExamen.idAnneeUniversitaire)
      .subscribe(au=>{
        au.filieres?.forEach(filiere =>{
          this.filieres = [...this.filieres,filiere.filiere];
        });
        au.sessions?.forEach(s=>{
          this.sessions = [s.typeSession+' - Ordinnaire',s.typeSession+' - Ratrrapage',...this.sessions];
        });
      });

    this.anneeUniversitaireService.getSemestre(this.planningExamen.idAnneeUniversitaire,this.planningExamen.session,this.planningExamen.nomFiliere)
      .subscribe(semestres=>this.semestres = semestres);
  }

  deletePlanning(){
    this.plannigExamenService.delete(this.id)
      .subscribe(()=>{
        this.planningExamens = this.planningExamens
          .filter(planning => planning.id != this.id);
      })
  }

  confirme(id?: number){
    this.id = id;
  }

  persistPlanning(){
    this.plannigExamenService.persist(this.planningExamen,this.avisFile,this.planningFile)
      .subscribe(planningExamen => {
        planningExamen.AnneeUniversitaire = this.nomAU;
        this.planningExamens = [planningExamen, ...this.planningExamens];
        this.planningExamen = {};
      });
  }

  downloadAvisExam(id?:number){
    this.plannigExamenService.getAvisExamen(id).subscribe();
  }

  downloadPlanningExam(id?:number){
    this.plannigExamenService.getPlanningExamen(id).subscribe();
  }

  selectAvis(event:any){
    this.avisFile = event.target.files[0];
  }

  selectPlanning(event:any){
    this.planningFile = event.target.files[0];
  }

  updatePlanning(){
    this.plannigExamenService.update(this.planningExamen,this.avisFile,this.planningFile)
      .subscribe(p=>{
        this.planningExamen = {};
        this.editForm = false;
      });
  }

}
