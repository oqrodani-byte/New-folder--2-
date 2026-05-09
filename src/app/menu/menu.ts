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
  productArr: any[] = [];      
  filteredArr: any[] = []; 
  categories: any[] = []; 
  searchQuery: string = '';
  minPrice: number = 0;
  maxPrice: number = 1000; 
  minRate: number = 0;
  minSpice: number = 0; 
  selectedCategoryId: number | null = null; 

  constructor(
    private api: Api, 
    private cdr: ChangeDetectorRef,
    private cartService: CartService,
    private router: Router
  ) {}

  private getItemCategoryId(item: any): number | null {
    if (item.categoryId !== undefined && item.categoryId !== null) {
      return Number(item.categoryId);
    }

    if (item.category?.id !== undefined && item.category?.id !== null) {
      return Number(item.category.id);
    }

    return null;
  }

  ngOnInit() {
   
    this.api.getCategories().subscribe((resp: any) => {
      this.categories = resp.data;
    });

   
    const adminItems = this.cartService.getCustomProducts() || [];
    this.productArr = [...adminItems];
    this.filteredArr = [...this.productArr];
    
    
    this.loadAllPages(1);
  }

  setCategory(id: any) {
    this.selectedCategoryId = id === null ? null : Number(id);
    this.productArr = [...(this.cartService.getCustomProducts() || [])];
    this.filteredArr = [...this.productArr];
    this.loadAllPages(1, this.selectedCategoryId);
  }

  loadAllPages(page: number, categoryId: number | null = null) {
    const query = [`page=${page}`, `perPage=12`];
    if (categoryId !== null) {
      query.push(`categoryId=${categoryId}`);
    }

    this.api.getData(`products?${query.join('&')}`).subscribe({
      next: (resp: any) => {
        const newItems = resp.data?.products || resp.data || [];
        
        
        this.productArr = [...this.productArr, ...newItems];
        this.applyFilters();

        if (resp.data?.hasMore) {
          this.loadAllPages(page + 1);
        } else {
          this.cdr.detectChanges();
        }
      },
      error: (er) => console.error("err", er)
    });
  }

  applyFilters() {
    this.filteredArr = this.productArr.filter(item => {
      
      const itemCatId = this.getItemCategoryId(item);
      const matchesCategory = this.selectedCategoryId === null || itemCatId === this.selectedCategoryId;

     
      const matchesSearch = item.name?.toLowerCase().includes(this.searchQuery.toLowerCase());
      const matchesPrice = item.price >= this.minPrice && item.price <= this.maxPrice;
      const matchesRate = (item.rate || 0) >= this.minRate;
      const matchesSpice = (item.spiciness || 0) >= this.minSpice;

      return matchesCategory && matchesSearch && matchesPrice && matchesRate && matchesSpice;
    });
    this.cdr.detectChanges();
  }

  sort(key: string) {
    this.filteredArr.sort((a, b) => (b[key] || 0) - (a[key] || 0));
  }

  clear() {
    this.searchQuery = '';
    this.minPrice = 0;
    this.maxPrice = 1000;
    this.minRate = 0;
    this.minSpice = 0; 
    this.selectedCategoryId = null;
    this.productArr = [...(this.cartService.getCustomProducts() || [])];
    this.filteredArr = [...this.productArr];
    this.loadAllPages(1);
  }

  addToOrder(item: Product) {
    this.cartService.addToCart(item); 
    this.router.navigateByUrl('/cart'); 
  }
}