import { Router } from '@angular/router';
import { Component, OnInit, NgZone } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  submitted = false;
  signupForm!: FormGroup;
  constructor( public fb: FormBuilder,
    private router: Router,private ngZone: NgZone,
    ) { 
     this.mainForm();
    }

  ngOnInit() {
  }

  mainForm() {
    this.signupForm = this.fb.group({
      Email: ['mmmmm@mmm.com'],
      password: ['lmlmlmlmlm']
    });
  }
  get myForm() {
    return this.signupForm.controls;
  }
  }
