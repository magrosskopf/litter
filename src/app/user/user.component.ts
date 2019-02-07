import { Component, OnInit } from '@angular/core';
import { HttpService } from '../../http.service';
import { User } from '../user';
import { Post } from '../../post';


@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.sass']
})
export class UserComponent implements OnInit {

  currentUser = {
    _id: null,
        name: null,
        email: null,
        password: null
  };
  currentUserInitial: String;

  usersPosts: Post[] = [];

  constructor(private _http: HttpService) {

    _http.getCurrentUser().subscribe(data => {
      console.log(data);
      this.currentUser = {
        _id: data._id,
        name: data.name,
        email: data.email,
        password: data.password
      };
      this.currentUserInitial = this.currentUser.name.substring(0, 1);
    });

    _http.getAllPosts(localStorage.getItem('token')).subscribe(data => {
      data.forEach(element => {
        if (element.user === this.currentUser._id) {
          this.usersPosts.push(element);
        }
      });
    });

   }

  ngOnInit() {

  }

  deletePost(post: Post) {
    this._http.deletePost(post);
     for (let index = 0; index < this.usersPosts.length; index++) {
      if (this.usersPosts[index]._id === post._id) {
        this.usersPosts.splice(index, 1);
      }
    }
  }

  updatePost(post) {
    this._http.updatePost(post);
  }

  lit(post: Post) {
    this._http.updatePost(post);
  }

  shit(post: Post) {
    this._http.updatePost(post);
  }

}
