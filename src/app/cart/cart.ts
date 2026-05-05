import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { CartService } from '../services/cartt';
import { Product } from '../models/product';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule],
  templateUrl: './cart.html',
  styleUrl: './cart.scss'
})
export class Cart implements OnInit {
  myItems: Product[] = [];

  constructor(private cartService: CartService) {}

  ngOnInit() {
    this.myItems = this.cartService.getItems();
  }

  
  sort(key: string) {
    this.myItems.sort((a: any, b: any) => (b[key] || 0) - (a[key] || 0));
  }

  
  removeItem(index: number) {
    this.myItems.splice(index, 1);
  }

  
  getTotalPrice(): number {
    return this.myItems.reduce((sum, item) => sum + item.price, 0);
  }
}