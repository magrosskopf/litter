import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
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
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent implements OnInit {
  rForm: FormGroup;
  post: any;                     // A property for our submitted form
  description = '';
  name = '';
  loadedPosts: Post[] = [];
  updateMode = false;

  constructor(private fb: FormBuilder, private _httpService: HttpService) {
    this.rForm = fb.group({
      'description' : [null, Validators.compose([Validators.required, Validators.minLength(1), Validators.maxLength(200)])],
    });
   }

  ngOnInit() {
    this.loadedPosts = [];
    this._httpService.getAllPosts().subscribe(data => {
      data.forEach(element => {
        this.loadedPosts.push(element);
        console.log(this.loadedPosts);
      });
      this.loadedPosts = this.loadedPosts.slice().reverse();
    });


  }

  getData() {

  }

  addPost(post) {
    this.description = post.description;
     const newPost: Post = {
      _id: '',
      user: 'Maius_XX',
      content: this.description,
      lits: 13,
      canDoALit: true,
      shits: 2,
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
    for (let index = 0; index < this.loadedPosts.length; index++) {
     if (this.loadedPosts[index]._id === post._id) {
       this.loadedPosts[index].lits = post.lits;
     }
   }
  }

  shit(post: Post) {
    this._httpService.updatePost(post);
    for (let index = 0; index < this.loadedPosts.length; index++) {
     if (this.loadedPosts[index]._id === post._id) {
       this.loadedPosts[index].shits = post.shits;
     }
   }
  }


}
