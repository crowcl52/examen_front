import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/reducers';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  public registerFG: FormGroup;
  public hide = true;
  isLoading = false;

  constructor( private _formBuilder: FormBuilder, private authService: AuthService, private store: Store<AppState> ) { 
    store.select('ui').subscribe( (data)=>{
      this.isLoading = data.isLoading;
    });
  }

  ngOnInit(): void {
    this.registerFG = this._formBuilder.group({
      name: ['', Validators.required],
      phone: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  register(){
    this.authService.register(this.registerFG.value);
  }
}
