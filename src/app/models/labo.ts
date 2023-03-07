import { Axe } from "./axe";
import { Chercheur } from "./chercheur";
import { Equipe } from "./equipe";

export class Labo {
     id?:number;
     acro_labo?:string;
     intitule?:string;
     responsable?: Chercheur;
     axes?: Axe[];
     member?:Chercheur[];
     equipes_object?:Equipe[];

     public Equipe(id?:number,
          acro_labo?:string,
          intitule?:string,
          responsable?: Chercheur,
          axes?: Axe[],
          member?:Chercheur[],
          equipes_object?:Equipe[] ) {
              this.id=id;
              this.acro_labo=acro_labo;
              this.intitule=intitule;
              this.responsable=responsable;
              this.axes=axes;
              this.member=member;
              this.equipes_object=equipes_object;
          }



  
}