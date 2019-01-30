import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { Observable, of } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { User } from './user';
import { CookieService } from 'angular2-cookie/services/cookies.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  user: Observable<User>;
  itemsRef: any;
  currentUid: string;

  constructor(
              private router: Router, private _cookieService: CookieService) {

      // Define the user observable
  /*     this.user = localStorage.getItem('currentUser').pipe(
        switchMap((user) => {
          if (user) {
            // set var to current logged in user
             return of(user);
          } else {
            // logged out, null
            return of(null);
          }
        })
      );
        this.getUserId(); */
  }

  setCookie() {
    this._cookieService.put('currentUser', '1234567');
  }

  getCookie(key: string){
    console.log(this._cookieService.get('currentUser'));

    return this._cookieService.get('currentUser');
  }

  signIn(email: string, password: string) {
    this.afAuth.auth.signInWithEmailAndPassword(email, password).then(success => {
      this.afAuth.auth.onAuthStateChanged((user) => {
        if (user) {
          this.user.subscribe((u) => {
            // this.checkUidInDatabase(u.uid);
            u = {
               uid: user.uid,
               email: user.email
            };
            this.setUserId(u.uid);
           this.router.navigate(['/wrapper-menu-dashboard']);
           });
        } else {
         console.log('Login failed');
        }
      });
    });

  }

  // checkUidInDatabase(uid: string) {
  //   this.itemsRef = this.db.list('users');
  // }

  setUserId(uid: string): any {
    if (this.db.list('/users', ref => ref.orderByChild('size').equalTo(uid))) {
      console.log(uid);
      this.itemsRef = this.db.list('users/').set(uid, {
        themes: ['Würth Rot Standard', 'Würth Alternativ'],
        dataUrls: {
          ganalytics: [''],
          piwik: [''],
          shopUrl: ['']
        }
      });
    } else {
      console.log('Würth Theme wurde gesetzt');

      this.itemsRef = this.db.list('users/').set(uid, {
        themes: ['Würth Rot Standard', 'Würth Alternativ'],
        dataUrls: {
          ganalytics: [''],
          piwik: [''],
          shopUrl: ['']
        }
      });
    }

  }

  getUserId(): any {
    this.afAuth.user.subscribe((user) => {
      this.currentUid = user.uid;
    });
  }



  logout() {
    this.afAuth.auth.signOut();
    this.afAuth.auth.onAuthStateChanged((user) => {
      this.user.subscribe(u => u = {
        uid: undefined,
        email: undefined
      });
    });
    this.router.navigateByUrl('/login');
  }
}
