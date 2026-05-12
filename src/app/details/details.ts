import { ChangeDetectorRef, Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router'; 
import { Api } from '../services/api';
import { CommonModule } from '@angular/common';
import { CartService } from '../services/cartt';

@Component({
  selector: 'app-details',
  standalone: true, 
  imports: [CommonModule, RouterLink], 
  templateUrl: './details.html',
  styleUrl: './details.scss',
})
export class Details implements OnInit {
  
  private route = inject(ActivatedRoute);
  private api = inject(Api);
  private cdr = inject(ChangeDetectorRef);
  private cartService = inject(CartService); 
  private router = inject(Router); 

  product: any = null; 
  isLoading: boolean = true;
  selectedId = 0;

  ngOnInit() {
    
    this.route.queryParams.subscribe(data => {
      this.selectedId = data['id'];
      if (this.selectedId) {
        this.loadProduct();
      }
    });
  }

  loadProduct() {
    this.api.getData('products/' + this.selectedId).subscribe({
      next: (resp: any) => {
        this.product = resp.data;
        this.isLoading = false;
        this.cdr.detectChanges(); 
      },
      error: (err) => {
        console.error('Ошибка загрузки товара:', err);
        this.isLoading = false;
      }
    });
  }

  
  addToOrder() {
    if (this.product) {
      this.cartService.addToCart(this.product);
      this.router.navigateByUrl('/cart');
    }
  }
}