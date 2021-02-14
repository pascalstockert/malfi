import { Component, OnInit } from '@angular/core';
import firebase from "firebase";
import { AngularFireAuth } from "@angular/fire/auth";
import { faGoogle } from "@fortawesome/free-brands-svg-icons/faGoogle";
import { colors } from "../../vars";
import { faGithub } from "@fortawesome/free-brands-svg-icons/faGithub";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  colors = colors;
  iconGoogle = faGoogle
  iconGithub = faGithub

  constructor( public auth: AngularFireAuth ) { }

  ngOnInit(): void {
  }

  loginGoogle() {
    console.log('Logging in with Google...');
    this.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider()).then( () => { console.log('Logged in!') } );
  }

  loginGithub() {
    console.log('Logging in with Github...');
    this.auth.signInWithPopup(new firebase.auth.GithubAuthProvider()).then( () => { console.log('Logged in!') } );
  }

  logout() {
    console.log('Logging out...');
    this.auth.signOut().then( () => { console.log('Logged out!') } );
  }

}
