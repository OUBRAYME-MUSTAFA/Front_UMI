import { Directive, Input } from '@angular/core';
import { AbstractControl, NG_VALIDATORS, ValidationErrors, Validator, ValidatorFn } from '@angular/forms';
import {Etablissement} from "../models/etablissement";

/** A hero's name can't match the given regular expression */
export function checkExistValidator(listObj:any[], attName:string): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    let forbidden = false;
    if(listObj.length != 0){
      for(let e of listObj){
        if(e[attName] == control.value){
          forbidden = true;
          break;
        }
      }
    }
    return forbidden ? {forbiddenName: {value: control.value}} : null;
  };
}

@Directive({
  selector: '[appCheckExist]',
  providers: [{provide: NG_VALIDATORS, useExisting: CheckExistValidatorDirective, multi: true}]
})
export class CheckExistValidatorDirective implements Validator {
  @Input('appCheckExist') checkExist : any[]= [] ;

  validate(control: AbstractControl): ValidationErrors | null {
    return this.checkExist ? checkExistValidator(this.checkExist[0],this.checkExist[1])(control)
      : null;
  }
}

