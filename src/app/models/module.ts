import { Element } from "./element";

export interface Module {
    id?:Number;
    nom?:String;
    moyen?:Number;
    coef?:Number;
    idFiliere?:Number;
    elements?:Array<Element>;
}
