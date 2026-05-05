import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Api } from '../services/api';
import { FormsModule } from '@angular/forms'; 
import { CommonModule } from '@angular/common'; 
import { RouterLink, Router } from '@angular/router'; 


import { CartService } from '../services/cartt';
import { Product } from '../models/product';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterLink], 
  templateUrl: './menu.html',
  styleUrl: './menu.scss',
})
export class Menu implements OnInit {
  constructor(
    private api: Api, 
    private cdr: ChangeDetectorRef,
    private cartService: CartService,
    private router: Router
  ) {}

  productArr: any[] = [];      
  filteredArr: any[] = [];     

  searchQuery: string = '';
  minPrice: number = 0;
  maxPrice: number = 500; 
  minRate: number = 0;
  minSpice: number = 0; 

  ngOnInit() {
    this.loadAllPages(1);
  }

  
  addToOrder(item: Product) {
    this.cartService.addToCart(item); 
    this.router.navigateByUrl('/cart'); 
  }

  loadAllPages(page: number) {
    this.api.getData(`products?page=${page}&perPage=10`).subscribe({
      next: (resp: any) => {
        const newItems = resp.data?.products || [];
        this.productArr = [...this.productArr, ...newItems];
        this.filteredArr = [...this.productArr];

        if (resp.data?.hasMore) {
          this.loadAllPages(page + 1);
        } else {
          this.cdr.detectChanges();
        }
      },
      error: (er) => {
        console.error("Fetch error:", er);
      }
    });
  }

  applyFilters() {
    this.filteredArr = this.productArr.filter(item => {
      const s = this.searchQuery.toLowerCase();
      const matchesSearch = item.name.toLowerCase().includes(s);
      const matchesPrice = item.price >= this.minPrice && item.price <= this.maxPrice;
      const matchesRate = item.rate >= this.minRate;
      const spiceLevel = item.spiciness ?? 0;
      const matchesSpice = spiceLevel >= this.minSpice;
      return matchesSearch && matchesPrice && matchesRate && matchesSpice;
    });
  }

  sort(key: string) {
    this.filteredArr.sort((a, b) => (b[key] || 0) - (a[key] || 0));
  }

  clear() {
    this.searchQuery = '';
    this.minPrice = 0;
    this.maxPrice = 500;
    this.minRate = 0;
    this.minSpice = 0; 
    this.filteredArr = [...this.productArr];
  }
}