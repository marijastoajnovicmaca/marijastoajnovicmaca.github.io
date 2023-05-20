import { Component, OnInit } from '@angular/core';
import { CartItem } from 'src/app/cartItem';
import { Stage } from 'src/app/cartItem';
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

  constructor(private cartService: CartService) { }

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

  checkIsReadOnly(cartItem : CartItem): boolean {

    if (cartItem.stage === "Pristiglo"){
      return false;
    }
    return true;
  }


}
