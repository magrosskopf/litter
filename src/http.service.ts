import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Post } from './post';
import { catchError, map } from 'rxjs/operators';
import { EmailValidator } from '@angular/forms';
import { User } from './app/user';
import { CookieService } from 'angular2-cookie/services/cookies.service';
import { AuthService } from './app/auth.service';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class HttpService {

  // tslint:disable-next-line:max-line-length
  constructor(private _http: HttpClient, private _cookieService: CookieService, private _authservice: AuthService, private router: Router) { }

  urlPosts = 'http://localhost:3000/posts/';
  urlUsers = 'http://localhost:3000/users/';

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json ; charset=UTF-8',
      'Authorization': 'Bearer ' + localStorage.getItem('token')
    })
  };

  token: String;

  getAllPosts(token: String): Observable<Post[]> {
    console.log(this.httpOptions);
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json ; charset=UTF-8',
        'Authorization': 'Bearer ' + token
      })
    };

    return this._http.get<Post[]>(this.urlPosts, httpOptions);
  }

  createNewPosts(post: Post) {

    this._http.post<Post>(this.urlPosts, post, this.httpOptions)
      .subscribe(
        res => {
          console.log(res);
        },
        err => {
          console.log("Error occured");
        }
      );

  /*   const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json'
      })
    };
    return this._http.patch<Post>(this.urlPosts, post, httpOptions);


     .pipe(
       catchError(err => {
         console.log(err);
         return of(null);
       })
     ); */
  }

  updatePost(post: Post) {
    console.log(post);

      this._http.patch(this.urlPosts + post._id, post, this.httpOptions)
        .subscribe(
          res => {
            console.log(res);
          },
          err => {
            console.log('Error occured');
          }
        );
  }

  deletePost(post: Post) {
    this._http.delete<Post>(this.urlPosts + post._id, this.httpOptions)
        .subscribe(
          res => {
            console.log(res);
          },
          err => {
            console.log("Error occured");
          }
        );
  }

  sendEmailandPassword(name: string, password: string) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json ; charset=UTF-8'
      })
    };
    console.log('test');

    this._http.post<any>(this.urlUsers + 'login', {email: name, password: password}, httpOptions ).subscribe( data => {
      localStorage.setItem('token', data.token);
      localStorage.setItem('userId', data.userId);
      this._authservice.isAuthenticated();
      this.router.navigate(['home']);
    },
    err => {
      console.log(err);

    }
    );
  }

  getCurrentUser(): Observable<User> {
    const userId = localStorage.getItem('userId');
    return this._http.get<User>(this.urlUsers + userId, this.httpOptions);
  }

  registerNewUser(email: string, password: string, name: string) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json ; charset=UTF-8'
      })
    };
    this._http.post<any>(this.urlUsers + 'signup', {email: name, password: password, name: name}, httpOptions ).subscribe( data => {
      localStorage.setItem('token', data.token);
      localStorage.setItem('userId', data.userId);
      console.log(data.userId);

      this._authservice.isAuthenticated();
      this.router.navigate(['home']);
    });
  }

  getCertainUser(uid: any): Observable<User> {
   return this._http.get<User>(this.urlUsers + uid, this.httpOptions);
  }
}
