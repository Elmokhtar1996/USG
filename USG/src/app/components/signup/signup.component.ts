import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AuthService } from '../../services/auth.service';

import { Router } from '@angular/router';
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent implements OnInit {
  signupForm: FormGroup;
  constructor(
    public fb: FormBuilder,
    public authService: AuthService,
    public router: Router
  ) {
    this.signupForm = this.fb.group({
      role: [''],
      email: [''],
      password: [''],
    });
  }
  ngOnInit() {}
  registerUser() {
    console.log("eee")
      const { role, email, password } = this.signupForm.value;
      this.authService.signUp(role, email, password).subscribe((res) => {
        if (res.result) {
          console.log("rrrr",res.result)
          this.signupForm.reset();
          this.router.navigate(['log-in']);
        }
      });
    }
    
  }
