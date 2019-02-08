import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Post } from '../../post';
import { HttpService } from '../../http.service';
import { Comment } from '../comment';


@Component({
  selector: 'app-jokecard',
  templateUrl: './jokecard.component.html',
  styleUrls: ['./jokecard.component.sass']
})
export class JokecardComponent implements OnInit {
  updateMode = false;
  rForm: FormGroup;
  exampleForm: FormGroup;
  // post: any;                     // A property for our submitted form
  description = '';
  @Input() post: Post;
  @Output() deletedPost = new EventEmitter<Post>();
  @Output() modifyLit = new EventEmitter<Post>();
  @Output() modifyShit = new EventEmitter<Post>();
  @Output() updateContent = new EventEmitter<Post>();

  currentUser = {
    _id: null,
        name: null,
        email: null,
        password: null
  };

  display = false;
  currentUserInitial: String;


  constructor(private fb: FormBuilder, private _httpService: HttpService) {
    this.rForm = fb.group({
      'description' : [null, Validators.compose([Validators.required, Validators.minLength(1), Validators.maxLength(200)])],
    });
    this.exampleForm = fb.group({
      'comment' : [null, Validators.compose([Validators.required, Validators.minLength(1), Validators.maxLength(200)])],
    });

  }

  ngOnInit() {
    this._httpService.getCertainUser(this.post.user).subscribe((data) => {
      this.currentUser = {
        _id: data._id,
        name: data.name,
        email: data.email,
        password: data.password
      };
      this.display = localStorage.getItem('userId') === this.post.user;
      this.currentUserInitial = this.currentUser.name.substring(0, 1);

    });
  }

  updatePostContent(formData, post: Post) {
    post.content = formData.description;
    this.updateContent.emit(post);
  }

  addComment(formData, post: Post) {
    let comment: Comment = {
      user: this.currentUser,
      content: formData.comment,
      timestamp: '' + new Date()
    };
    post.comments.push(comment);
    this.updateContent.emit(post);
  }


  toggleUpdateMode() {
    this.updateMode = !this.updateMode;
  }

  lit(post: Post) {
      if (!post.lits.includes(localStorage.getItem('userId'))) {
        post.lits.push(localStorage.getItem('userId'));
        this.modifyLit.emit(post);
      } else {
        const index = post.lits.indexOf(localStorage.getItem('userId'));
        post.lits.splice(index, 1);
        this.modifyLit.emit(post);
      }

  }

  shit(post: Post) {
    if (!post.shits.includes(localStorage.getItem('userId'))) {
      post.shits.push(localStorage.getItem('userId'));
      this.modifyShit.emit(post);
    } else {
      const index = post.shits.indexOf(localStorage.getItem('userId'));
      post.shits.splice(index, 1);
      this.modifyShit.emit(post);
    }
  }

  delete(post: Post) {
    this.deletedPost.emit(post);
  }

}
