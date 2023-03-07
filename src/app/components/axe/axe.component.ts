import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Axe } from 'src/app/models/axe';
import { AxeService } from 'src/app/services/axe.service';

@Component({
  selector: 'app-axe',
  templateUrl: './axe.component.html',
  styleUrls: ['./axe.component.css']
})
export class AxeComponent implements OnInit {
  axe!: Axe 
  myAxe:Axe={'name':''  }
  axes : Axe[]=[];
  editForm =false
  value : any
  id!:number
  search : any

  constructor(private axeService :AxeService) { }

  async ngOnInit():  Promise<void> {
    this.getAxes();
  }

  getAxes() {
    this.axeService.findAll()
        .subscribe((res)=> this.axes=res)
    
      
  }
  deleteAxe() {
   
       this.axeService.delete(this.id)
            .subscribe(()=>{ 
              this.axes=this.axes.filter(axe =>axe.id!=this.id)
            })

      
  }

  addAxe(form :NgForm){
    
    this.axeService.persist(this.myAxe )
        .subscribe((axe)=>{
        this.axes =[axe, ...this.axes];
        console.log("axe name = "+this.myAxe.name)
        this.resetAxe(form);
        this.getAxes();
      
        })
  }

  editAxe(axe:Axe){
    this.myAxe = axe;
    this.editForm=true;

  }

  resetAxe(form :NgForm){
    form.reset();
    this.myAxe={'name':''  }
    }

    confirme(id: any){
      this.id = id;
    }
  updateAxe(form :NgForm){
    this.axeService.updateAxe(this.myAxe)
    .subscribe(task=>{
      this.resetAxe(form);
     
    })
  }
  change(vv:boolean) {
    this.editForm =vv
  }

//   onChercher(value: any) {
//     this.axeService.search(value)
//     .subscribe((res)=> this.axes=res)
//       })
//   }
 }
