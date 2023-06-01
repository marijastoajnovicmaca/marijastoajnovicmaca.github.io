import { Component, QueryList, ViewChildren } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { books } from 'src/app/book-data';import { AuthenticationService } from 'src/app/services/authentication.service';
;
import { UserProfile } from 'src/app/userProfile';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {

  uniqueGenres: string[] = Array.from(new Set(books.map(book => book.genre)));
  selectedValues: string[] = [];

  userProfile: UserProfile = {
    name: '',
    surname: '',
    email: '',
    phone: '',
    address: '',
    password: '',
    favGenres: []
  }

  constructor(private authService: AuthenticationService,  private snackBar: MatSnackBar, private router: Router) {}

  userProfiles: UserProfile[] = [];


  getChipClass(option: string): string {
    return this.selectedValues.includes(option) ? 'selected-chip' : 'unselected-chip';
  }

  isSelected(option: string): boolean {
    return this.selectedValues.includes(option);
  }

  toggleSelection(option: string): void {
    if (this.isSelected(option)) {
      this.selectedValues = this.selectedValues.filter(value => value !== option);
    } else {
      this.selectedValues.push(option);
    }
  }

  resetForm() : void {
    this.userProfile = {
      name: '',
      surname: '',
      address: '',
      phone: '',
      email: '',
      password: '',
      favGenres: []
    };
    this.selectedValues = [];
  }
/** 
  registerUser(): void {

    this.userProfile.favGenres = this.selectedValues;
    this.userProfiles.push(this.userProfile);
    sessionStorage.setItem('userProfiles', JSON.stringify(this.userProfiles));
    this.resetForm();
    console.log(this.userProfiles);
  }
*/
openSnackBar(poruka: string): void {

  this.snackBar.open(poruka, 'Zatvori', {
    duration: 3000, // Prikazuje Snackbar 3000ms (3 sekunde)
    verticalPosition: 'top' // Postavlja poziciju Snackbar-a na vrh
  });
}

registerUser(): void {
  this.userProfile.favGenres = this.selectedValues;

  const registrationResult = this.authService.register(this.userProfile);
  if (registrationResult === 'success') {
    this.resetForm();
    this.openSnackBar('Uspesna registracija');
    this.router.navigate(['/login']);
  } else if (registrationResult === 'email_exists') {
    this.openSnackBar('Email vec postoji');
  } else {
    this.openSnackBar('Greska prilikom registracije');
  }
}


}
