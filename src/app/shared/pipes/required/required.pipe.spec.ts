import { RequiredPipe } from './required.pipe';
import { AbstractControl } from '@angular/forms';

describe('RequiredPipe', () => {
  let pipe: RequiredPipe;
  beforeEach(() => {
    pipe = new RequiredPipe();
  });

  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('test_field_is_null_returns_false', () => {
    const field = null;
    const requiredPipe = new RequiredPipe();
    expect(requiredPipe.transform(field)).toBe(false);
  });

  it('should return true when field has required validator', () => {
    const field: AbstractControl = {
      validator: () => ({ required: true }),
    } as unknown as AbstractControl;

    const result = pipe.transform(field);

    expect(result).toBe(true);
  });

  it('should return false when field is null', () => {
    const field: AbstractControl | null = null;

    const result = pipe.transform(field);

    expect(result).toBe(false);
  });
});
