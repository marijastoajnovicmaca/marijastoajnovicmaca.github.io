import { Component, Inject } from '@angular/core';
import { Book, BookDetailsData } from '../book';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CartService } from '../services/cart.service';

@Component({
  selector: 'app-book-details',
  templateUrl: './book-details.component.html',
  styleUrls: ['./book-details.component.css']
})

export class BookDetailsComponent {
  book: Book;
  rate = 0;

  constructor(
    @Inject(MAT_DIALOG_DATA) private data: BookDetailsData,
    public cartService: CartService,
    public dialogRef: MatDialogRef<BookDetailsComponent>
  ) {
    this.book = data.book;
  }

  addToCart() {
    this.cartService.addItem(this.book);
    this.dialogRef.close();
  }
}
