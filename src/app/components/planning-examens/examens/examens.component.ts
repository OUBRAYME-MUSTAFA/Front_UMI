import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-examens',
  templateUrl: './examens.component.html',
  styleUrls: ['./examens.component.css']
})
export class ExamensComponent implements OnInit {

  idPlanning:string | null = null;
  constructor(private activedRoute:ActivatedRoute) { }

  ngOnInit(): void {
    this.idPlanning = this.activedRoute.snapshot.paramMap.get('id');
    console.log(this.idPlanning);
  }

}
