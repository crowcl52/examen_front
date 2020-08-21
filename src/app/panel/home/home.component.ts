import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/reducers';
import { User } from 'src/app/models/user.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  user: User = { name:"", email:"", phone:"" }

  constructor( private store: Store<AppState> ) {
    store.select('user').subscribe( data=>{
      this.user = data.data;
    } )
   }

  ngOnInit(): void {
  }

}
