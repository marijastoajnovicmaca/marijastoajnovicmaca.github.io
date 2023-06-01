import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { books } from 'src/app/book-data';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { UserProfile } from 'src/app/userProfile';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  userProfile!: UserProfile | null;
  isEditMode = false;
  uniqueGenres: string[] = Array.from(new Set(books.map(book => book.genre)));

  constructor(private authService: AuthenticationService,  private router: Router) { }

  ngOnInit(): void {
    this.userProfile = this.authService.getLoggedInUser();
  }

  updateProfile(): void {
    if (this.userProfile) {
      this.authService.updateUserProfile(this.userProfile);
    }
    this.isEditMode = false;
  }

  openEditMode(): void {
    this.isEditMode = true;
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['']);
  }



}
