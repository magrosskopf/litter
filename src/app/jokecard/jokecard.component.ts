import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Post } from '../../post';
import { HttpService } from '../../http.service';


@Component({
  selector: 'app-jokecard',
  templateUrl: './jokecard.component.html',
  styleUrls: ['./jokecard.component.sass']
})
export class JokecardComponent implements OnInit {
  updateMode = false;
  rForm: FormGroup;
  // post: any;                     // A property for our submitted form
  description = '';
  @Input() post: Post;
  @Output() deletedPost = new EventEmitter<Post>();
  @Output() modifyLit = new EventEmitter<Post>();
  @Output() modifyShit = new EventEmitter<Post>();
  @Output() updateContent = new EventEmitter<Post>();

  constructor(private fb: FormBuilder, private _httpService: HttpService) {
    this.rForm = fb.group({
      'description' : [null, Validators.compose([Validators.required, Validators.minLength(1), Validators.maxLength(200)])],
    });
   }

  ngOnInit() {
  }

  updatePostContent(formData, post: Post) {
    post.content = formData.description;
    this.updateContent.emit(post);
  }


  toggleUpdateMode() {
    this.updateMode = !this.updateMode;
  }

  lit(post: Post) {
    if (post.canDoALit === true) {
      post.lits = ++post.lits;
      post.canDoALit = !post.canDoALit;
      this.modifyLit.emit(post);
    } else {
      post.lits = --post.lits;
      post.canDoALit = !post.canDoALit;
      this.modifyLit.emit(post);
    }
  }

  shit(post: Post) {
    if (post.canDoAShit === true) {
      post.shits = ++post.shits;
      post.canDoAShit = !post.canDoAShit;
      this.modifyLit.emit(post);
    } else {
      post.shits = --post.shits;
      post.canDoAShit = !post.canDoAShit;
      this.modifyLit.emit(post);

    }
  }

  delete(post: Post) {
    this.deletedPost.emit(post);
  }

}
