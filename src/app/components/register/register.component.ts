import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  user: User = new User();

  name = new FormControl(this.user.name, [Validators.required, Validators.minLength(8), Validators.pattern('[a-zA-Z ]*')]);
  email = new FormControl('', [Validators.required, Validators.email]);
  password = new FormControl(this.user.password, [Validators.required, Validators.minLength(8), Validators.maxLength(15)])
  mobile = new FormControl(this.user.phoneNumber, [Validators.required, Validators.minLength(10), Validators.maxLength(10)]);

  constructor() { }

  ngOnInit() {
  }

  nameValidation() {
    return this.name.hasError('required') ? 'must required' : '';
  }

  MobileNumber() {
    return this.mobile.hasError('required') ? 'must required' : '';
  }

  emailValidation() {
    return this.email.hasError('required') ? 'You must enter a value' :
      this.email.hasError('email') ? 'Not a valid email' : '';
  }

  getErrorPassword() {
    return this.password.hasError('required') ? 'You must enter a value' :
      this.password.hasError('password') ? 'Min 6 Elements' : '';
  }


}
