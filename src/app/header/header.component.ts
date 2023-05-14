import { Component, EventEmitter, Output, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { books } from '../book-data';
import { Book } from '../book';
import { WelcomeComponent } from '../welcome/welcome.component';

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

}
