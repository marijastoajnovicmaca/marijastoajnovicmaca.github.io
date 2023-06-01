import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  email!: string;
  password!: string;

  constructor(private authService: AuthenticationService, private router: Router, private snackBar: MatSnackBar) {}

  login(): void {
    const isAuthenticated = this.authService.login(this.email, this.password);
    if (isAuthenticated === 'success') {
      this.router.navigate(['']);
    } else if (isAuthenticated === 'wrong_password') {  
      this.openSnackBar('Pogresna sifra');
    } else if (isAuthenticated === 'email_not_found') {
      this.openSnackBar('Ne postojeci email');
    } else {
      this.openSnackBar('Nema registorvanih korisnika');
    }
  }

  openSnackBar(poruka: string): void {

    this.snackBar.open(poruka, 'Zatvori', {
      duration: 3000, // Prikazuje Snackbar 3000ms (3 sekunde)
      verticalPosition: 'top' // Postavlja poziciju Snackbar-a na vrh
    });
  }

}
