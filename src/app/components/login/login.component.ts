import { Component } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  username!: string;
  password!: string;

  constructor() { }

  login() {
    // Ovdje možete implementirati logiku prijave
    console.log('Prijavljen korisnik:', this.username);
  }

}
