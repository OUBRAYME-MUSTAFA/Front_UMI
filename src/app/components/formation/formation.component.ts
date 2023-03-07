import { Component, OnInit } from '@angular/core';
import { Chercheur } from 'src/app/models/chercheur';
import { Formation } from 'src/app/models/formation';
import { ChercheurService } from 'src/app/services/chercheur.service';
import { FormationService } from 'src/app/services/formation.service';
import { HttpEventType, HttpResponse } from '@angular/common/http';
import {DomSanitizer} from "@angular/platform-browser";
import { Buffer } from 'node:buffer';
import {jqxWindowComponent} from "jqwidgets-ng/jqxwindow";
import { Observable } from 'rxjs';
import {map} from "rxjs";
import { NgForm } from '@angular/forms';
@Component({
  selector: 'app-formation',
  templateUrl: './formation.component.html',
  styleUrls: ['./formation.component.css']
})
export class FormationComponent implements OnInit {
  formation!: Formation;
  myFormation=new  Formation()
  public fileDb:any;
  Document! :any ;
  Image! :any ;
  Document2! :any ;
  Image2! :any ;
  formations : Formation[]=[];
  chercheurs  :Chercheur[]=[];
  editForm =false;

  selectedFiles!: any;
  currentFile!: any;
  progress = 0;
  message = '';
  search : any

  fileInfos!: Observable<any>;
  
 
  constructor(private formationService : FormationService, private chercheurService :ChercheurService ,private sanitizer: DomSanitizer ) { }

  async ngOnInit():  Promise<void> {
    this.getFormations();
    //this.fileInfos = this.uploadService.getFiles();

  
 
  }

  getFormations() {
    this.formationService.findAll()
        .subscribe(resFormation=> this.formations=resFormation)
    this.chercheurService.findAll()
        .subscribe( res1=>{
          this.chercheurs = res1;})

  }

  deleteFormation(id: any) { 
    let conf=confirm("Etes vous sûre?");
    if(conf)
         { this.formationService.delete(id)
              .subscribe(()=>{ 
                this.formations=this.formations.filter(formation =>formation.id!=id)
              })}
      
  }

  addFormation(form: NgForm){
    this.formationService.persist(this.myFormation , this.Document , this.Image)
        .subscribe((formation)=>{
        this.formations =[formation, ...this.formations];
        this.resetFormation(form);
        this.getFormations();
       
        })        
    }

  editFormation(formation:Formation){
    this.myFormation = formation;
    
    this.myFormation.responsable!.id=formation.responsable!.id
    this.myFormation.responsable!.nom=formation.responsable!.nom
    this.myFormation.responsable!.prenom=formation.responsable!.prenom

    this.editForm=true;
    

  }

  resetFormation(form: NgForm){
    form.reset();
 
    this.myFormation= new Formation()
  }

  updateFormation(form: NgForm){
    this.formationService.updateFormation(this.myFormation , this.Document , this.Image)
    .subscribe((formation)=>{
      this.formations =[formation, ...this.formations];
     
      this.resetFormation(form);
      this.getFormations();
     
      })        
   
  }

  change(vv:boolean) {
    this.editForm =vv
  }

  toArray(answers: any) {
    return Object.keys(answers).map(key => answers[key])
  }

  selectFile(event:any): void {
    this.selectedFiles = event.target.files;
  }
  selectDocument(event:any){
    this.Document = event.target.files[0];
  }
  selectImage(event:any){
    this.Image = event.target.files[0];
  }
  
  downloadDoc(id?:number){
    console.log(id)
    this.formationService.getDocument(id).subscribe();
  }  
  downloadImg(id?:number){
    this.formationService.getImage(id).subscribe();
  }

  downloadFile(id?:number) {

    //calling service
    this.formationService.downloadFile(id).subscribe((response: { data: any; filename: string; }) => {

        console.log(response);
        var binaryData = [];
        binaryData.push(response.data);
        var url = window.URL.createObjectURL(new Blob(binaryData, {type: "application/pdf"}));
        var a = document.createElement('a');
        document.body.appendChild(a);
        a.setAttribute('style', 'display: none');
        a.setAttribute('target', 'blank');
        a.href = url;
        a.download = response.filename;
        a.click();
        window.URL.revokeObjectURL(url);
        a.remove();

    }, (error: any) => {

        console.log(error);
    });
}
  
consulterImage(idEvenement: any) {
  this.formationService.downloadImageBytes(idEvenement).subscribe((data:Blob)=>{
    this.fileDb = this.sanitizer.bypassSecurityTrustResourceUrl(URL.createObjectURL(new Blob([data], { type: 'image/png' })));
},error => console.log(error));
  // @ts-ignore
  $("#imageModal").modal("show");
}

closeImage() {
  // @ts-ignore
  $("#imageModal").modal("hide");
}

consulterDocument(idEvenement: any) {
  this.formationService.downloadDocumentBytes(idEvenement).subscribe((data:Blob)=>{
    this.fileDb = this.sanitizer.bypassSecurityTrustResourceUrl(URL.createObjectURL(new Blob([data], { type: 'application/pdf' })));
},error => console.log(error));
  // @ts-ignore
  $("#DocumentModal").modal("show");
}

closeDocument() {
  // @ts-ignore
  $("#DocumentModal").modal("hide");
}

}
