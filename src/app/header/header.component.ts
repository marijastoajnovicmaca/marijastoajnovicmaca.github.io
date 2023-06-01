import { Component, EventEmitter, Output, ViewChild } from '@angular/core';
import { NavigationEnd, Router, UrlSegment } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';
import { isEqual } from 'lodash';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

  @Output() filterClick = new EventEmitter();

  onFilterClick() {
    this.filterClick.emit();
  }

  constructor(private router: Router, public authService: AuthenticationService) {
  }

  getCurrentRoute(): string {
    return this.router.url; // Dobijanje trenutne rute kao string
  }

  isHome(): boolean {
    return this.getCurrentRoute() === '/';
  }

  isLogInPage(): boolean{
    return this.getCurrentRoute() === '/login';
  }

  isRegistrationPage(): boolean{
    return this.getCurrentRoute() === '/signup';
  }

  isProfilePage(): boolean{
    return this.getCurrentRoute() === '/profile';
  }


}
