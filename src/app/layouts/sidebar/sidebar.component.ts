import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  active(id:string){
    // document.querySelector("#sidebar a.nav-link:not(.collapsed)")?.classList.add('collapsed');
    // document.querySelector(id)?.classList.remove('collapsed');
  }

}
