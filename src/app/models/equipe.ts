import { Axe } from "./axe";
import { Chercheur } from "./chercheur";
import { Labo } from "./labo";

export class Equipe {
    id?:number;
    acro_equipe?:string;
    intitule?:string;
    responsable?: Chercheur;
    axes?: Axe[];
    member?:Chercheur[];
    labo?:Labo ;

    public Equipe(id?:number,
        acro_equipe?:string,
        intitule?:string,
        responsable?: Chercheur,
        axes?: Axe[],
        member?:Chercheur[],
        labo?:Labo ) {
            this.id=id;
            this.acro_equipe=acro_equipe;
            this.intitule=intitule;
            this.responsable=responsable;
            this.axes=axes;
            this.member=member;
            this.labo=labo;
        }

        

}
