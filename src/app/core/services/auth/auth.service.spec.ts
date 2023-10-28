import { TestBed, inject } from '@angular/core/testing';
import { AuthService } from './auth.service';

describe('AuthService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AuthService],
    });
  });

  it('should be created', inject([AuthService], (service: AuthService) => {
    expect(service).toBeTruthy();
  }));

  /*it('should return initial login status', inject([AuthService], (service: AuthService) => {
    const initialStatus = service.isLogin;
    expect(initialStatus).toBe(false);
  }));
*/
  it('should set login status', inject([AuthService], (service: AuthService) => {
    const newStatus = true;
    service.isLogin = newStatus;
    expect(service.isLogin).toBe(newStatus);
  }));
});
