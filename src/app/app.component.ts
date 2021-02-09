import { Component } from '@angular/core';
import { AngularFireAuth } from "@angular/fire/auth";
import firebase from "firebase";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  constructor( public auth: AngularFireAuth ) {
  }
  login() {
    console.log('Logging in...');
    this.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider()).then( () => { console.log('Logged in!') } );
  }
  logout() {
    console.log('Logging out...');
    this.auth.signOut().then( () => { console.log('Logged out!') } );
  }
}
