import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Post } from './post';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  urlPosts = 'http://localhost:3000/posts/';



  constructor(private _http: HttpClient) { }

  getAllPosts(): Observable<Post[]> {
    return this._http.get<Post[]>(this.urlPosts);
  }

  createNewPosts(post: Post) {
    const httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json ; charset=UTF-8'
    })
  };
    this._http.post<Post>(this.urlPosts, post, httpOptions)
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
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json ; charset=UTF-8'
      })
    };
    console.log(post);

      this._http.patch(this.urlPosts + post._id, post, httpOptions)
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
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'raw ; charset=UTF-8'
      })
    };
    this._http.delete<Post>(this.urlPosts + post._id, httpOptions)
        .subscribe(
          res => {
            console.log(res);
          },
          err => {
            console.log("Error occured");
          }
        );
  }
}
