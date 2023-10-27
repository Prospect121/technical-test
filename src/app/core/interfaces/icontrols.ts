import { FormArray, FormControl, FormGroup } from '@angular/forms';

export interface IControls {
  name: string;
  control: FormControl | FormArray<any> | FormGroup;
}
