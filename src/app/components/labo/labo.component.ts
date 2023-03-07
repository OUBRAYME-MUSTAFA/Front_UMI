import { Component, OnInit } from '@angular/core';
import { Chercheur } from 'src/app/models/chercheur';
import { Labo } from 'src/app/models/labo';
import { LaboService} from 'src/app/services/labo.service'
import { ChercheurService} from 'src/app/services/chercheur.service'


import { ChercheurComponent } from '../chercheur/chercheur.component';
import { AxeService } from 'src/app/services/axe.service';
import { Axe } from 'src/app/models/axe';
import { Equipe } from 'src/app/models/equipe';
import { EquipeService } from 'src/app/services/equipe.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-labo',
  templateUrl: './labo.component.html',
  styleUrls: ['./labo.component.css']
})
export class LaboComponent implements OnInit {

      

        labo!: Labo;
        equipes:Equipe[] = [];
        pureEquipes : Equipe []=[];
        myLabo= new Labo()
        // myLabo: Labo = {

        //   acro_labo:'',
        //   intitule:'',
        //   responsable : {

        //     'nom':'',
        //     'prenom':''
        //   },
        //   axes :[],
        //   member:[],
        //   equipes_object : []
        // }
        labos : Labo[]=[];
        chercheurs  :Chercheur[]=[];
        axes:Axe[]=[];
        editForm =false;
        addEquipe=false;
        addAxe= false;
        axesUsername:Axe[]=[];
        dropdownList = [];
        selectedItems = [];
        dropdownSettings = {};
        dropdownSettings_equipe = {};
        dropdownSettings_axe    = {};
        idsSelected :  number[] =[]
        membresSelected:any;
        dropdownSettings_resp = {};
        hideFormError:Boolean = true
        hideFormOk:Boolean = true
        formMessage = ""
        isFormDisabled!: true 
        search:any



        constructor(private laboService : LaboService, private chercheurService :ChercheurService , private axeService:AxeService , private equipeService : EquipeService) { }

        async ngOnInit():  Promise<void> {
          this.getLabos();
      
        
          this.dropdownSettings = {
            singleSelection: false,
            idField: 'id',
            textField: 'nom',
            selectAllText: 'Select All',
            unSelectAllText: 'UnSelect All',
            allowSearchFilter: true,
            itemsShowLimit: 3,
            noDataAvailablePlaceholderText:'pas des membres'
          };
          this.dropdownSettings_equipe = {
            singleSelection: false,
            idField: 'id',
            textField: 'acro_equipe',
            selectAllText: 'Select All',
            unSelectAllText: 'UnSelect All',
            allowSearchFilter: true,
            itemsShowLimit: 3,
            noDataAvailablePlaceholderText:'pas d\'Equipes'

          };
          this.dropdownSettings_axe = {
            singleSelection: false,
            idField: 'id',
            textField: 'name',
            selectAllText: 'Select All',
            unSelectAllText: 'UnSelect All',
            allowSearchFilter: true,
            itemsShowLimit: 3,
            noDataAvailablePlaceholderText:'pas d\'axes'

          };

          this.dropdownSettings_resp = {
            text:"Select Responsable",
            singleSelection: true,
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

        getLabos() {
          this.laboService.findAll()
              .subscribe((resLabo)=> this.labos=resLabo)
          this.chercheurService.findAll()
              .subscribe( res1=>{
                this.chercheurs = res1;})
          this.axeService.findAll()
          .subscribe(async res=>{
            this.axes = res;})
         this.equipeService.findAll()
            .subscribe((resEquipe)=> this.equipes=resEquipe)
            console.log(this.equipes);
         this.equipeService.PureEquipes()
            .subscribe((resEquipe)=> this.pureEquipes=resEquipe)
        }

        deleteLabo(id: any) { 
          let conf=confirm("Etes vous sûre?");
          if(conf)
               { this.laboService.delete(id)
                    .subscribe(()=>{ 
                      this.labos=this.labos.filter(labo =>labo.id!=id)
                    })
              }
            
        }

        addLabo(form : NgForm){
         
           this.hideFormError = true;
           console.log(this.myLabo.responsable?.prenom)
      //  if(!this.myLabo.responsable) {
      //   console.log("i am here")
      //     this.hideFormError = false;
      //     this.formMessage = "Erreur choisie un responsable "
      //     return ;
      //     }
          console.log(this.myLabo)
          this.laboService.persist(this.myLabo )
              .subscribe((labo)=>{
              this.labos =[labo, ...this.labos];
              this.resetLabo(form);
              this.getLabos();
             
              })        
          }

        editLabo(labo:Labo){
          this.myLabo = labo;
          this.myLabo.responsable=labo.responsable
          this.editForm=true;

        }

        resetLabo(form: NgForm){
       form.reset();
       this.myLabo = new Labo();
          // this.myLabo={
          //     acro_labo:'',
          //     intitule:'',
          //     responsable : {
          
          //       'nom':'',
          //       'prenom':''
          //     }    ,
          //     member:[],
          //     axes:[]  ,
          //     equipes_object : []
          //   }
          }

        updateLabo(form : NgForm){
          console.log(this.myLabo)
          this.laboService.updateLabo(this.myLabo)
          .subscribe(task=>{
            this.resetLabo(form);
           
          })
          this.axeService.findAll()
          .subscribe(async res=>{
            this.axes = res;})
        }

        onItemSelect() {
          console.log(this.membresSelected)
        }
        async onItemDeSelect() {
          console.log(this.membresSelected)
        }
        onSelectAll() {
          console.log(this.membresSelected)
        }
        onUnSelectAll() {
          console.log(this.membresSelected)
        }
        change(vv:boolean) {
          this.editForm =vv
        }
        changeEq(vv:boolean) {
          this.addEquipe =vv
        }
        changeAx(vv:boolean) {
          this.addAxe =vv
        }

        toArray(answers: any) {
          return Object.keys(answers).map(key => answers[key])
        }


        
}
