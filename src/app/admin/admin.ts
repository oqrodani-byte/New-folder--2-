import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CartService } from '../services/cartt';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './admin.html',
  styleUrl: './admin.scss'
})
export class Admin {
  
  name: string = '';
  price: number = 0;
  image: string = '';
  spiciness: number = 0;

  constructor(private cartService: CartService, private router: Router) {}

  saveProduct() {
    if (!this.name || !this.price) {
      alert('Fill name and price!');
      return;
    }

    const newProd = {
      id: Date.now(),
      name: this.name,
      price: this.price,
      image: this.image || 'https://via.placeholder.com/150', 
      rate: 5,
      spiciness: this.spiciness
    };

    this.cartService.addCustomProduct(newProd);
    this.router.navigate(['/menu']); 
  }
}