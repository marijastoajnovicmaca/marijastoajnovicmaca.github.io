import { Component, Inject } from '@angular/core';
import { Book, BookDetailsData } from '../book';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CartService } from '../services/cart.service';
import { CartItem } from '../cartItem';
import { Stage } from '../cartItem';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-book-details',
  templateUrl: './book-details.component.html',
  styleUrls: ['./book-details.component.css']
})

export class BookDetailsComponent {
  book: Book;
  rate = 0;
  count = 1;
  cartItem: CartItem;

  constructor(
    @Inject(MAT_DIALOG_DATA) private data: BookDetailsData,
    public cartService: CartService,
    public dialogRef: MatDialogRef<BookDetailsComponent>,
    private snackBar: MatSnackBar
  ) {
    this.book = data.book;
    this.cartItem = {book: data.book, count: this.count, stage: Stage.during}
  }

  openSnackBar(): void {

    const dynamicContent =  this.book.name;
    const message = 'Uspešno ste dodali knjigu ' + dynamicContent + ' u Vašu korpu.';

    this.snackBar.open(message, 'Zatvori', {
      duration: 3000, // Prikazuje Snackbar 3000ms (3 sekunde)
      verticalPosition: 'top' // Postavlja poziciju Snackbar-a na vrh
    });
  }

  addToCart() {
    this.cartItem.count = this.count;
    this.cartService.addItem(this.cartItem);
    this.openSnackBar();
    this.dialogRef.close();
  }
}
