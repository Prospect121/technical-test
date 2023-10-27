import { ValidatorFn, Validators } from '@angular/forms';

export default {
  cellPhone: /^[1-9][\d]{2}[1-9]((?!0000000)\d){6}$/,
};

/*
export function allowedValuesPattern(allowedValues: string[]): ValidatorFn {
  return Validators.pattern(`^(${allowedValues.join('|')})$`);
}
*/
