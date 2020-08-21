import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import {AuthService} from '../auth.service';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/reducers';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public loginFG: FormGroup;
  public hide = true;
  isLoading = false;

  constructor( 
    private _formBuilder: FormBuilder, 
    private router: Router, 
    private authService: AuthService, 
    private store: Store<AppState> ) { 
      
    store.select('ui').subscribe( (data)=>{
      this.isLoading = data.isLoading;
    });
  }

  ngOnInit(): void {
    this.loginFG = this._formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  register(){
    this.authService.login( this.loginFG.value);
  }

}
