import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Api } from '../services/api';
import { FormsModule } from '@angular/forms'; 
import { CommonModule } from '@angular/common'; 
import { RouterLink } from '@angular/router'; 
import { Injectable } from '@angular/core';
import { Product } from '../models/product';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private items: Product[] = [];

  // Метод, который вызывает Menu
  addToCart(product: Product) {
    this.items.push(product);
    console.log('Product added to service:', product.name);
  }

  
  getItems() {
    return this.items;
  }

 
  clearCart() {
    this.items = [];
    return this.items;
  }
}