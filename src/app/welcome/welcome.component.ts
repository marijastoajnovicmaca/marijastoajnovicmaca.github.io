import { Component, Inject} from '@angular/core';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { books } from '../book-data';
import { MatDialog } from '@angular/material/dialog';
import { BookDetailsComponent } from '../book-details/book-details.component';
import { Book, BookDetailsData } from '../book';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent    {

  filterTerm!: string;
  faSearch = faSearch;
  books = books;

  constructor (public dialog: MatDialog) {}

  openDialog(book: Book): void {
    const data : BookDetailsData = { book };
    const dialogRef = this.dialog.open(BookDetailsComponent, { height: '400px', width: '600px', data });
  }
}


