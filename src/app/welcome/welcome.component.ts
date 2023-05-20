import { Component, ViewChild} from '@angular/core';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { books } from '../book-data';
import { MatDialog } from '@angular/material/dialog';
import { BookDetailsComponent } from '../book-details/book-details.component';
import { Book, BookDetailsData } from '../book';
import { MatSidenav } from '@angular/material/sidenav';
import { CartService } from '../services/cart.service';
import { CartItem, Stage } from '../cartItem';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent    {

  filterTerm!: string;
  faSearch = faSearch;
  filteredBooks = books;

  
  constructor (public dialog: MatDialog, public cartService: CartService, private snackBar: MatSnackBar) {}

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

  openSnackBar(book: Book): void {

    const dynamicContent =  book.name;
    const message = 'Uspešno ste dodali knjigu ' + dynamicContent + ' u Vašu korpu.';

    this.snackBar.open(message, 'Zatvori', {
      duration: 3000, // Prikazuje Snackbar 3000ms (3 sekunde)
      verticalPosition: 'top' // Postavlja poziciju Snackbar-a na vrh
    });
  }
 
  addToCart(book: Book){
    const cartItem: CartItem = {
      book: book,
      count: 1, // ili bilo koja druga početna vrednost
      stage: Stage.during // ili bilo koja druga početna vrednost
    };
  
    this.openSnackBar(book);
    this.cartService.addItem(cartItem);
  }
}


