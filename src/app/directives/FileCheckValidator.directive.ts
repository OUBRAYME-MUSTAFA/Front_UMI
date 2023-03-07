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
  selector: '[appCheckFile]',
  providers: [{provide: NG_VALIDATORS, useExisting: FileCheckValidatorDirective, multi: true}]
})
export class FileCheckValidatorDirective implements Validator {
  @Input('appCheckFile') checkFile : string = '' ;

  validate(control: AbstractControl): ValidationErrors | null {
    // return this.checkExist ? checkExistValidator(this.checkExist[0],this.checkExist[1])(control)
    //   : null;
    console.log(control.value)
    console.log(this.checkFile)
    return null;
  }
}

