import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private _isLogin: boolean = false;

  get isLogin(): boolean {
    const login = sessionStorage.getItem('isLogin');
    this._isLogin = login !== null ? login === 'true' : false;
    return this._isLogin;
  }

  set isLogin(isLogin: boolean) {
    this._isLogin = isLogin;
    sessionStorage.setItem('isLogin', this._isLogin.toString());
  }
}
