import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { CookieService } from 'angular2-cookie/services/cookies.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private jwtHelper: JwtHelperService, private _cookieService: CookieService) {

  }
  isAuthenticated(): Boolean {
    let token = localStorage.getItem('token');
    console.log(token);

    if (token === undefined) {
      return false;
    }
    return !this.jwtHelper.isTokenExpired(token);
  }
}
