import { ActivatedRouteSnapshot, CanActivateChild, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { AuthService } from '../services/auth/auth.service';

@Injectable({
  providedIn: 'root',
})
export class MasterChildGuard implements CanActivateChild {
  constructor(
    private _authService: AuthService,
    private _router: Router,
  ) {}

  canActivateChild(next: ActivatedRouteSnapshot): boolean | Observable<boolean> {
    return this.canAccess(next);
  }

  protected canAccess(next: ActivatedRouteSnapshot): boolean {
    const isLogin = this._authService.isLogin;
    if (!isLogin) {
      this._router.navigate(['/auth']);
      return false;
    }
    return true;
  }
}
