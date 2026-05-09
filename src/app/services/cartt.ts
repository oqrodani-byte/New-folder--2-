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
  
  private items: any[] = []; 
  public customProducts: any[] = []; 

  constructor() {}

  // Методы для корзины
  addToCart(product: Product) {
    this.items.push({ ...product, quantity: 1 });
  }

  getItems() {
    return this.items;
  }

  clearCart() {
    this.items = [];
    return this.items;
  }

  
  addCustomProduct(product: any) {
    
    this.customProducts.push(product);
  }

  getCustomProducts() {
    return this.customProducts;
  }
}