import { Component, OnInit } from '@angular/core';
import { Validators, FormControl, FormGroup } from '@angular/forms';
import { Login } from 'src/app/models/login';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
   /**
   * login object about consist of 
   * 1)email
   * 2)password feilds
   */
  login: Login = new Login("", "");
  loginForm: FormGroup;
  token: string;
  email = new FormControl(this.login.email, [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]);
  password = new FormControl(this.login.password, [Validators.required, Validators.minLength(8)])

  constructor() { }

  ngOnInit() {
  }
/**
   * Email validation
   */
  getErrorEmail() {
    return this.email.hasError('required') ? 'You must enter a value' :
      this.email.hasError('email') ? 'Not a valid email' : '';
  }
  /**
   * Password Validation
   */
  getErrorPassword() {
    return this.password.hasError('required') ? 'You must enter a value' :
     this.password.hasError('password') ? 'Min 6 Elements' : '';
  }
}
