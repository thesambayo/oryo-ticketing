import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export class CustomValidators {

  public static nonEmpty(message: string): ValidatorFn {
    return (control: AbstractControl<string>): ValidationErrors | null => {
      if (control.value === undefined || control.value === null || control.value.trim() === '') {
        return { nonEmpty: message };
      }
      return null;
    };
  }

}
