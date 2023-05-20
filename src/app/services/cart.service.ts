import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { CartItem } from '../cartItem';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  private cartItems: CartItem[] = [];
  private cartItemsSubject: BehaviorSubject<CartItem[]> = new BehaviorSubject(this.cartItems);

  constructor() { }

  getCartItems() {
    return this.cartItems;
  }

  addItem(item: CartItem) {
    this.cartItems.push(item);
    this.cartItemsSubject.next(this.cartItems);
    console.log(this.getCartItems());
  }

  updateOrder(order: CartItem): void {
    const index = this.cartItems.findIndex(o => o.book.bookId === order.book.bookId);
    if (index >= 0) {
      this.cartItems[index] = order;
      this.cartItemsSubject.next(this.cartItems);
    }
  }

  removeItem(item: CartItem) {
    const index = this.cartItems.indexOf(item);
    if (index !== -1) {
      this.cartItems.splice(index, 1);
      this.cartItemsSubject.next(this.cartItems);
    }
  }

   // metoda za pretragu narudžbina
   searchOrders(query: string): Observable<CartItem[]> {
    const filteredOrders = this.cartItems.filter(o => o.book.name.toLowerCase().includes(query.toLowerCase()));
    return new Observable<CartItem[]>(observer => {
      observer.next(filteredOrders);
      observer.complete();
    });
  }

  // metoda za računanje ukupne cene
  getTotalPrice(): number {
    return this.cartItems.reduce((total, order) => total + order.count * order.book.price, 0);
  }

 // metoda za dobavljanje narudžbina
  getOrders(): Observable<CartItem[]> {
    return this.cartItemsSubject.asObservable();
  }
}