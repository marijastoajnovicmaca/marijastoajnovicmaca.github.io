import { Component, ViewChild} from '@angular/core';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { books } from '../book-data';
import { MatDialog } from '@angular/material/dialog';
import { BookDetailsComponent } from '../book-details/book-details.component';
import { Book, BookDetailsData } from '../book';
import { MatSidenav } from '@angular/material/sidenav';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent    {

  filterTerm!: string;
  faSearch = faSearch;
  filteredBooks = books;

  
  constructor (public dialog: MatDialog) {}

  @ViewChild('sidenav') sidenav!: MatSidenav;

  openDialog(book: Book): void {
    const data : BookDetailsData = { book };
    const dialogRef = this.dialog.open(BookDetailsComponent, { height: '67%', width: '60%', data });
  }

  openSidenav() {
    this.sidenav.open();
  }

  receiveFilteredBooks(filteredBooks: Book[]) {
    this.filteredBooks = filteredBooks;
  }
 
}


