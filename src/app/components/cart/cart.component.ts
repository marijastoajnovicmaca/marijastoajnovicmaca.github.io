import { Component, OnInit } from '@angular/core';
import { calculateAverageRating } from 'src/app/book-data';
import { CartItem } from 'src/app/cartItem';
import { Stage } from 'src/app/cartItem';
import { Review } from 'src/app/review';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  cartItems: CartItem[] = [];
  isConditionCountFulfilled: boolean = false;
  bookName!: string;
  inputValue = "";

  constructor(private cartService: CartService, public authService: AuthenticationService) { 

  }

  ngOnInit(): void {
    this.cartItems = this.cartService.getCartItems();
  }

  getTotalPrice(): number
  {
     return this.cartService.getTotalPrice();
  }

// Neophodna logika za proveru uslova i postavljanje vrednosti 'isConditionFulfilled'
  checkConditionCount(cartItem: CartItem): boolean {

    if(cartItem.stage === "Pristiglo")
    {
      this.isConditionCountFulfilled = true;
    }
    else{
      this.isConditionCountFulfilled = false;
    }
    return this.isConditionCountFulfilled;
  }

  sendCartItems(): void
  {
    for (let i = 0; i < this.cartItems.length; i++) {
      if(this.cartItems[i].stage === "U toku")
      {
        this.cartItems[i].stage = Stage.arrived;
      }
    }
  }

  checkConditionRemove(cartItem: CartItem): boolean {

    if (cartItem.stage === "Pristiglo"){
      return false;
    }

    return true;
  }

  removeCartItem(cartItem: CartItem): void {

    this.cartService.removeItem(cartItem);
  }

  checkConditionCancel(cartItem: CartItem): boolean{

      if (cartItem.stage === "U toku")
      {
        return false;
      }
      return true;
  }

  cancelCartItem(cartItem: CartItem): void{

    cartItem.stage = Stage.cancelled;  
  }

  onInputChange(): void {

    this.cartService.searchOrders(this.inputValue);
  }

  checkIsPristiglo(cartItem : CartItem): boolean {

    if (cartItem.stage === "Pristiglo"){
      return true;
    }
    return false;
  }



  onRatingChange(rating: number): boolean {
    if (rating === 0){
      return false;
    }
    return true;
  }

}
