import { Component, OnInit, OnDestroy, ChangeDetectionStrategy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Observable, from } from 'rxjs';
import { HttpService } from '../../http.service';
import { Post } from '../../post';
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.sass'],
})
export class HomeComponent implements OnInit {
  rForm: FormGroup;
  post: any;                     // A property for our submitted form
  description = '';
  name = '';
  loadedPosts: Post[] = [];
  updateMode = false;
  date: any;
  token: String;

  constructor(private fb: FormBuilder, private _httpService: HttpService) {

    this.rForm = fb.group({
      'description' : [null, Validators.compose([Validators.required, Validators.minLength(1), Validators.maxLength(200)])],
    });


   }

  ngOnInit() {
    const token = localStorage.getItem('token');
    setTimeout(() => {
      console.log(localStorage.getItem('token'));

      this._httpService.getAllPosts(token).subscribe(data => {
        this.loadedPosts = data.slice().reverse();
      });

    }, 2000);
  }

  getData() {

  }

  addPost(post) {

    this.description = post.description;
     const newPost: Post = {
      _id: '',
      user: localStorage.getItem('userId'),
      content: this.description,
      lits: [],
      canDoALit: true,
      shits: [],
      canDoAShit: true,
      comments: new Comment(),
      timestamp: '' + new Date()
    };
    this._httpService.createNewPosts(newPost);
    const tempPost = this.loadedPosts;
    this.loadedPosts = [];
    this.loadedPosts.push(newPost);
    tempPost.forEach(element => {
      this.loadedPosts.push(element);
    });
  }

  deletePost(post: Post) {
    this._httpService.deletePost(post);
     for (let index = 0; index < this.loadedPosts.length; index++) {
      if (this.loadedPosts[index]._id === post._id) {
        this.loadedPosts.splice(index, 1);
      }
    }
  }

  updatePost(post) {
    this._httpService.updatePost(post);
  }

  lit(post: Post) {
    this._httpService.updatePost(post);
  }

  shit(post: Post) {
    this._httpService.updatePost(post);
  }


}
