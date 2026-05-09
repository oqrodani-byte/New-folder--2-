import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { CartService } from '../services/cartt';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule],
  templateUrl: './cart.html',
  styleUrl: './cart.scss'
})
export class Cart implements OnInit {
  myItems: any[] = [];
  checkoutState: string = 'cart';

  constructor(private cartService: CartService) {}

  ngOnInit() {
    this.myItems = this.cartService.getItems();
    
   
    this.myItems.forEach(item => {
      if (!item.quantity) item.quantity = 1;
    });
  }

  sort(key: string) {
    this.myItems.sort((a: any, b: any) => (b[key] || 0) - (a[key] || 0));
  }

  removeItem(index: number) {
    this.myItems.splice(index, 1);
  }

  increaseQty(item: any) {
    item.quantity = (item.quantity || 1) + 1;
  }

  decreaseQty(item: any, index: number) {
    if (item.quantity > 1) {
      item.quantity--;
    } else {
      this.removeItem(index);
    }
  }

  getTotalPrice(): number {
    return this.myItems.reduce((sum, item) => {
      return sum + (item.price * (item.quantity || 1));
    }, 0);
  }

  openConfirm() { 
    this.checkoutState = 'confirm'; 
  }

  cancelCheckout() { 
    this.checkoutState = 'cart'; 
  }
  
  processOrder() {
    this.checkoutState = 'success';

  }
}