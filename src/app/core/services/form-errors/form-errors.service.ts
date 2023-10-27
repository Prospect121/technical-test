import { Injectable } from '@angular/core';
import { FormGroup, FormArray, AbstractControl } from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class FormErrorsService {
  constructor() {}

  showFormErrors(form: FormGroup): void {
    if (!form) return;
    this.changeControlStatus(form, 'markAsTouched');
    this.changeControlStatus(form, 'markAsDirty');
  }

  private changeControlStatus(control: AbstractControl, func: string): void {
    switch (func) {
      case 'markAsTouched':
        control.markAsTouched();
        break;
      case 'markAsDirty':
        control.markAsDirty();
        break;
    }

    control.setErrors(control.errors);

    if (control instanceof FormGroup) {
      Object.values(control.controls).forEach(nestedControl => {
        if (nestedControl instanceof AbstractControl) {
          this.changeControlStatus(nestedControl, func);
        }
      });
    }

    if (control instanceof FormArray) {
      control.controls.forEach(nestedControl => {
        if (nestedControl instanceof AbstractControl) {
          this.changeControlStatus(nestedControl, func);
        }
      });
    }
  }
}
