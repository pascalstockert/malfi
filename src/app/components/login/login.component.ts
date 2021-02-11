import { Component, OnInit } from '@angular/core';
import firebase from "firebase";
import { AngularFireAuth } from "@angular/fire/auth";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor( public auth: AngularFireAuth ) { }

  ngOnInit(): void {
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
