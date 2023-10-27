import { Validators, FormBuilder } from '@angular/forms';

export const commonFieldsModelForms = (fb: FormBuilder) => {
  return fb.group({
    id: [0],
    creationDate: [''],
  });
};
