import { Chercheur } from "./chercheur";

export class Formation {
    id?:number;
    name?:string;
    type?:string;
    responsable?: Chercheur;


    public Formation(id?:number,
        name?:string,
        type?:string,
        responsable?: Chercheur) {
            this.id=id;
            this.name=name;
            this.type=type;
            this.responsable=responsable;
        }
 
  
}
