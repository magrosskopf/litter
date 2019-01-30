import {
  Component,
  OnInit,
  Host
} from '@angular/core';
import {
  Router
} from '@angular/router';
import {
  FormGroup,
  FormControl,
  Validators,
  ReactiveFormsModule,
  FormBuilder
} from '@angular/forms';
import {
  AuthService
} from '../auth.service';
import { Observable } from 'rxjs';

import { AppComponent } from '../app.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass']
})
export class LoginComponent implements OnInit {
  registerForm: any;
  formBuilder = new FormBuilder;
  lockedIn = false;
  signupForm: FormGroup;
  constructor() { }


  ngOnInit() {
    this.signupForm = this.fb.group({
      'email': ['info@wit.de', [
        Validators.required,
        Validators.email
        ]
      ],
      'password': ['1234567', [

        Validators.minLength(6),
        Validators.maxLength(25),
        Validators.required
        ]
      ]
    });

  }

  get email() { return this.signupForm.get('email'); }
  get password() { return this.signupForm.get('password'); }

  login() {
    // this.lockedIn = true;
    return this.authService.signIn(this.email.value, this.password.value);
  }

}
