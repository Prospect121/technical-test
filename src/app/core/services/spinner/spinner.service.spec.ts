import { TestBed } from '@angular/core/testing';
import { SpinnerService } from './spinner.service';

describe('SpinnerService', () => {
  let spinnerService: SpinnerService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SpinnerService],
    });

    spinnerService = TestBed.inject(SpinnerService);
  });

  it('should be created', () => {
    expect(spinnerService).toBeTruthy();
  });

  it('should increase cont when show is called', () => {
    spinnerService.show();
    expect(spinnerService.cont).toBe(1);
  });

  it('should decrease cont when hide is called', () => {
    spinnerService.show();
    spinnerService.hide();
    expect(spinnerService.cont).toBe(0);
  });
});
