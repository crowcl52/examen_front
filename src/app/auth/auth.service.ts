import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Store } from '@ngrx/store';
import { AppState } from '../reducers';
import { ActivateLoadingAction, DeactivateLoadingAction } from '../redux/ui.actions';
import {MatSnackBar} from '@angular/material/snack-bar';
import { SetUserAction } from '../redux/user.actions';
import { User } from '../models/user.model';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = "http://localhost:8080/";
  private user: User = null;

  constructor( private http: HttpClient, private store: Store<AppState>, private _snackBar: MatSnackBar, private router: Router ) { }

  login(user) {
    let url = `${this.apiUrl}login`;
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    this.store.dispatch(new ActivateLoadingAction());

    this.http.post(url, user).subscribe((data: any) => {
      this.store.dispatch( new SetUserAction({ ...data.result[0] } ) );
      this.user = data.result[0];
      this.store.dispatch(new DeactivateLoadingAction());
      this.router.navigate(['/home']);

    }, err => {
      this.store.dispatch(new DeactivateLoadingAction());
      this._snackBar.open(err.error.message, "Cerrar", {duration: 2000});
    })
  }

  register(user) {
    let url = `${this.apiUrl}register`;
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    this.store.dispatch(new ActivateLoadingAction());

    this.http.post(url, user).subscribe((data: any) => {
      this.store.dispatch(new DeactivateLoadingAction()) ;
      this._snackBar.open("Usuario creado con éxito", "Cerrar", {duration: 2000});


    }, err => {
      this.store.dispatch(new DeactivateLoadingAction());
      this._snackBar.open(err.error.message, "Cerrar", {duration: 2000});
    })
  }

  isAuth(): boolean {
    if (this.user != null) {
      return true;
    } else {
      this.router.navigate(['/']);
      return false;
    }
  }

}
