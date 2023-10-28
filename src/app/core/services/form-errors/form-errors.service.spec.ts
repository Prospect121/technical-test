import { TestBed } from '@angular/core/testing';
import { FormGroup, FormControl, FormArray } from '@angular/forms';
import { FormErrorsService } from './form-errors.service';

describe('FormErrorsService', () => {
  let formErrorsService: FormErrorsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FormErrorsService],
    });
    formErrorsService = TestBed.inject(FormErrorsService);
  });

  it('should mark form controls as touched and dirty', () => {
    const form = new FormGroup({
      firstName: new FormControl(),
      lastName: new FormControl(),
      addresses: new FormArray([
        new FormGroup({
          street: new FormControl(),
          city: new FormControl(),
        }),
        new FormGroup({
          street: new FormControl(),
          city: new FormControl(),
        }),
      ]),
    });

    formErrorsService.showFormErrors(form);

    expect(form.touched).toBe(true);
    expect(form.dirty).toBe(true);

    expect(form.get('firstName')?.touched).toBe(true);
    expect(form.get('firstName')?.dirty).toBe(true);

    expect(form.get('lastName')?.touched).toBe(true);
    expect(form.get('lastName')?.dirty).toBe(true);

    const addresses = form.get('addresses') as FormArray;
    addresses.controls.forEach((address) => {
      expect(address.touched).toBe(true);
      expect(address.dirty).toBe(true);

      expect(address.get('street')?.touched).toBe(true);
      expect(address.get('street')?.dirty).toBe(true);

      expect(address.get('city')?.touched).toBe(true);
      expect(address.get('city')?.dirty).toBe(true);
    });
  });

  it('should not throw errors for null or undefined form', () => {
    expect(() => formErrorsService.showFormErrors(null as any)).not.toThrow();
    expect(() => formErrorsService.showFormErrors(undefined as any)).not.toThrow();
  });
});
