import { Component, OnInit } from '@angular/core';
import { Equipe } from 'src/app/models/equipe';
import { Chercheur } from 'src/app/models/chercheur';
import { Axe } from 'src/app/models/axe';
import { ChercheurService } from 'src/app/services/chercheur.service';
import { AxeService } from 'src/app/services/axe.service';
import { EquipeService } from 'src/app/services/equipe.service';
import { Labo } from 'src/app/models/labo';
import { LaboService } from 'src/app/services/labo.service';


@Component({
  selector: 'app-equipe',
  templateUrl: './equipe.component.html',
  styleUrls: ['./equipe.component.css']
})
export class EquipeComponent implements OnInit {
   var:any;
  equipe!: Equipe;
  myEquipe =new Equipe()
  labos : Labo[] = [];
  equipes : Equipe[]=[];
  search :any

  chercheurs  :Chercheur[]=[];
  axes:Axe[]=[];
  editForm =false;
  axesUsername:Axe[]=[];
  dropdownList = [];
  selectedItems = [];
  dropdownSettings = {};
  dropdownSettings_membre = {};
  dropdownSettings_axe = {};
  dropdownSettings_labo={};
  dropdownSettings_resp={};
  membresSelected:number=0;



  constructor(private equipeService : EquipeService, private chercheurService :ChercheurService , private axeService:AxeService , private laboService : LaboService ) { }
  async ngOnInit():  Promise<void> {
    this.getequipes();
    console.log(this.equipes)
  
    this.dropdownSettings = {
      singleSelection: false,
      idField: 'id',
      textField: 'nom',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      allowSearchFilter: true,
      itemsShowLimit: 3,
      noDataAvailablePlaceholderText:'there is no elements yet'
    };
    this.dropdownSettings_axe = {
      singleSelection: false,
      idField: 'id',
      textField: 'name',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      allowSearchFilter: true,
      itemsShowLimit: 3,
      noDataAvailablePlaceholderText:'pas d\'axe pour l\'affiche'
    };
    this.dropdownSettings_membre = {
      text:"Select des membres",
      singleSelection: false,
      idField: 'id',
      textField: 'nom',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      allowSearchFilter: true,
      itemsShowLimit: 3,
      noDataAvailablePlaceholderText:'there is no membre yet'
    };
    this.dropdownSettings_labo = {
      text:"Select un laboratoire",
      singleSelection: false,
      idField: 'id',
      textField: 'acro_labo',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      allowSearchFilter: true,
      itemsShowLimit: 3,
      noDataAvailablePlaceholderText:'there is no labo yet'
    };
    this.dropdownSettings_resp = {
      text:"Select Responsable",
      singleSelection: false,
      idField: 'id',
      textField: 'nom',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      allowSearchFilter: true,
      itemsShowLimit: 3,
      noDataAvailablePlaceholderText:'there is no membre yet'
    };


  //  Get all username axaes
  this.axeService.findAll()
  .subscribe(async res=>{
              this.axes = res;
              console.log(this.axes)
            },err =>{
              console.log(err);
            })
  }

  getequipes() {
    this.equipeService.findAll()
        .subscribe((resEquipe)=> this.equipes=resEquipe)
        console.log(this.equipes);
    this.chercheurService.findAll()
        .subscribe( res1=>{
          this.chercheurs = res1;})
    this.axeService.findAll()
    .subscribe(async res=>{
      this.axes = res;})
    this.laboService.findAll()
    .subscribe((resLabo)=> this.labos=resLabo)
    this.dropdownSettings_membre
  }

  deleteEquipe(id: any) { 
    let conf=confirm("Etes vous sûre?");
    if(conf)
         { this.equipeService.delete(id)
              .subscribe(()=>{ 
                this.equipes=this.equipes.filter(labo =>labo.id!=id)
              })}
      
  }

  addEquipe(){
    this.membresSelected=this.myEquipe.member!.length
    console.log("########################")
    console.log(this.membresSelected)
    this.equipeService.persist(this.myEquipe )
        .subscribe((labo)=>{
          console.log(labo)
        this.equipes =[labo, ...this.equipes];

        this.getequipes();
        this.resetEquipe();
        
       
        },err =>{
          console.log(err);
        })      
    }

  editEquipe(equipe:Equipe){
    this.myEquipe = equipe;
    this.myEquipe.responsable=equipe.responsable
    this.editForm=true;
    this.membresSelected=this.chercheurs.length
    

  }

  resetEquipe(){
    this.myEquipe=new Equipe(); 
    }

  updateEquipe(){
     console.log(this.myEquipe)
    this.equipeService.updateLabo(this.myEquipe)
    .subscribe(task=>{
      this.getequipes();
      this.resetEquipe();
     
    },err =>{
      console.log(err);
    })

  }

  onItemSelect() {
    console.log("tttttttttttttttttttttttt")
    this.membresSelected=this.myEquipe.member!.length

    console.log(this.membresSelected)
  }
  async onItemDeSelect() {
    console.log("ddddddddddd")
    this.membresSelected=this.myEquipe.member!.length
    console.log(this.membresSelected)
  }
  onSelectAll() {
    this.membresSelected=this.chercheurs.length
    console.log(this.membresSelected)
  }
  onUnSelectAll() {
    this.membresSelected=0
    console.log(this.membresSelected)
  }
  change(vv:boolean) {
    this.membresSelected=0
    this.editForm =vv
  }

  toArray(answers: any) {
    return answers && Object.keys(answers)?.map(key => answers[key])
  }

  checkfct(){
    if(this.membresSelected >3 ){
      return false;
    }
    return true;
  }

  
}
