import { Directive, Input } from '@angular/core'
import {NG_VALIDATORS, Validator, AbstractControl, Validators, ValidatorFn, ValidationErrors} from '@angular/forms'

export function checkNumberValidator(chekNumber:any,int:boolean): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    let checkBetween = false;
    let checkInteger = false;
    let val:any = {};
    if(control.value != null){
      if(int){
        checkInteger = !(parseInt(control.value,10) === control.value);
      }
      if(chekNumber['min']){
        if(chekNumber['max']){
          if(control.value>chekNumber['max'] || control.value<chekNumber['min']){
            checkBetween = true;
          }
        }else{
          if(control.value<chekNumber['min']){
            checkBetween = true;
          }
        }
      }else{
        if(chekNumber['max']){
          if(control.value>chekNumber['max']){
            checkBetween = true;
          }
        }
      }
    }

    if(checkInteger){
      val['checkInteger'] = {value: control.value};
    }
    if(checkBetween){
      val['checkNumberBetween'] = {value: control.value};
    }
    return (checkBetween || checkInteger) ? val : null;
  };
}

@Directive({
  selector: '[appCheckNumber]',
  providers: [{ provide: NG_VALIDATORS, useExisting: NumberValidatorDirective, multi: true }]
})
export class NumberValidatorDirective implements Validator {

  @Input('appCheckNumber') chekNumber: any[] = [];

  validate(control: AbstractControl): ValidationErrors | null {
    return this.chekNumber ? checkNumberValidator(this.chekNumber[0],this.chekNumber[1])(control):null;
  }
}
