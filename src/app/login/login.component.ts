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
import { HttpService } from '../../http.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass']
})
export class LoginComponent implements OnInit {
  registerForm: any;
  fb = new FormBuilder;
  lockedIn = false;
  signupForm: FormGroup;
  constructor(private _authservice: AuthService, private _http: HttpService, private router: Router) {

  }


  ngOnInit() {
    this.signupForm = this.fb.group({
      'email': ['maiusx@asdasfx.de', [
        Validators.required,
        Validators.email
        ]
      ],
      'password': ['123456', [

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
    // this._http.sendEmailandPassword('maiusx@asdasfx.de', '123456');
console.log(this.email.value);

    this._http.sendEmailandPassword(this.email.value, this.password.value);




  }

}
