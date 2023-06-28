import { EventEmitter, Injectable } from '@angular/core';
import { UserProfile } from '../userProfile';
import { CartService } from './cart.service';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private isLoggedIn = false;
  isLoggedInChange: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor(private cartService: CartService) {}

  login(email: string, password: string): string {
    const userProfilesString = sessionStorage.getItem('userProfiles');
    if (userProfilesString) {
      const userProfiles = JSON.parse(userProfilesString);

      const existingUser = userProfiles.find((user: UserProfile) => user.email === email);
      if (existingUser) {
        if (existingUser.password === password) {
          // Uspešna prijava
          this.isLoggedIn = true;
          this.isLoggedInChange.emit(true);
          sessionStorage.setItem('loggedInUserEmail', email);
          this.isLoggedInChange.emit(true);
          return 'success';
        } else {
          // Pogrešna šifra
          return 'wrong_password';
        }
      } else {
        // Email ne postoji
        return 'email_not_found';
      }
    } else {
      // Nema korisničkih profila u sessionStorage-u
      return 'no_user_profiles';
    }
  }

  
  register(userProfile: UserProfile): string {
    const userProfilesString = sessionStorage.getItem('userProfiles');
    if (userProfilesString) {
      const userProfiles = JSON.parse(userProfilesString);

      const existingUser = userProfiles.find((user: UserProfile) => user.email === userProfile.email);
      if (existingUser) {
        // Email već postoji
        return 'email_exists';
      } else {
        // Dodaj novog korisnika
        userProfiles.push(userProfile);
        sessionStorage.setItem('userProfiles', JSON.stringify(userProfiles));
        return 'success';
      }
    } else {
      // Nema korisničkih profila u sessionStorage-u, kreiraj novi niz
      const newUserProfiles = [userProfile];
      sessionStorage.setItem('userProfiles', JSON.stringify(newUserProfiles));
      return 'success';
    }
  }

  logout(): void {
    this.isLoggedIn = false;
    this.isLoggedInChange.emit(false);
    this.cartService.clearCart();
  }

  isAuthenticated(): boolean {
    return this.isLoggedIn;
  }

  getLoggedInUser(): UserProfile | null {
    const userProfilesString = sessionStorage.getItem('userProfiles');
    const loggedInUserEmail = sessionStorage.getItem('loggedInUserEmail');
    
    if (userProfilesString && loggedInUserEmail) {
      const userProfiles = JSON.parse(userProfilesString);
      const loggedInUser = userProfiles.find((user: UserProfile) => user.email === loggedInUserEmail);
      return loggedInUser || null;
    }
    
    return null;
  }

  updateUserProfile(userProfile: UserProfile): void {
    const userProfilesString = sessionStorage.getItem('userProfiles');
    if (userProfilesString) {
      const userProfiles = JSON.parse(userProfilesString);

      // Pronalaženje indeksa trenutnog korisnika
      const currentUserIndex = userProfiles.findIndex((user: UserProfile) => user.email === userProfile.email);

      if (currentUserIndex !== -1) {
        // Ažuriranje korisničkog profila u sessionStorage-u
        userProfiles[currentUserIndex] = userProfile;

        // Konverzija natrag u JSON string i čuvanje u sessionStorage-u
        sessionStorage.setItem('userProfiles', JSON.stringify(userProfiles));

        console.log('Profil je uspešno ažuriran.');
      } else {
        console.error('Korisnik nije pronađen.');
      }
    } else {
      console.error('Nema korisničkih profila u sessionStorage-u.');
    }
  }
}