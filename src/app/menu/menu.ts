import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Api } from '../services/api';
import { FormsModule } from '@angular/forms'; 
import { CommonModule } from '@angular/common'; 
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [FormsModule, CommonModule,RouterLink], 
  templateUrl: './menu.html',
  styleUrl: './menu.scss',
})
export class Menu implements OnInit {
  constructor(private api: Api, private cdr: ChangeDetectorRef) {}

  productArr: any[] = [];      
  filteredArr: any[] = [];     

 
  searchQuery: string = '';
  minPrice: number = 0;
  maxPrice: number = 200; 
  minRate: number = 0;

  ngOnInit() {
    this.api.getData('products').subscribe({
      next: (resp: any) => {
        this.productArr = resp.data?.products || resp; 
        this.filteredArr = [...this.productArr];
        this.cdr.detectChanges();
      },
      error: er => alert(er.message)
    });
  }


  applyFilters() {
    this.filteredArr = this.productArr.filter(item => {
      const s = this.searchQuery.toLowerCase();
      return item.name.toLowerCase().includes(s) &&
             item.price >= this.minPrice &&
             item.price <= this.maxPrice &&
             item.rate >= this.minRate;
    });
  }

 
  sort(key: string) {
    this.filteredArr.sort((a, b) => b[key] - a[key]);
  }

  clear() {
    this.searchQuery = '';
    this.minPrice = 0;
    this.maxPrice = 200;
    this.minRate = 0;
    this.filteredArr = [...this.productArr];
  }
}