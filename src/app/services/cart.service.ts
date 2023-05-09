import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Book } from '../book';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cartItems: Book[] = [];
  private cartItemsSubject = new BehaviorSubject<Book[]>([]);

  constructor() { }

  getCartItems() {
    return this.cartItems;
  }

  addItem(item: Book) {
    this.cartItems.push(item);
    this.cartItemsSubject.next(this.cartItems);
  }

  removeItem(item: Book) {
    const index = this.cartItems.indexOf(item);
    if (index !== -1) {
      this.cartItems.splice(index, 1);
      this.cartItemsSubject.next(this.cartItems);
    }
  }
}