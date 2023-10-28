import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private _isLogin: boolean = false;

  get isLogin(): boolean {
    return this._isLogin;
  }

  set isLogin(isLogin: boolean) {
    this._isLogin = isLogin;
  }
}
