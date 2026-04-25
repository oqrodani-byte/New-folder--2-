import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Api } from '../services/api';
import { FormsModule } from '@angular/forms'; // ОБЯЗАТЕЛЬНО ДЛЯ ngModel
import { CommonModule } from '@angular/common'; // ДЛЯ ПАЙПОВ И КЛАССОВ

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [FormsModule, CommonModule], 
  templateUrl: './menu.html',
  styleUrl: './menu.scss',
})
export class Menu implements OnInit {
  constructor(private api: Api, private cdr: ChangeDetectorRef) {}

  productArr: any[] = [];      // Оригинал с сервера
  filteredArr: any[] = [];     // То, что показываем

  // Поля фильтров
  searchQuery: string = '';
  minPrice: number = 0;
  maxPrice: number = 200; // Поставь макс предел побольше
  minRate: number = 0;

  ngOnInit() {
    this.api.getData('products').subscribe({
      next: (resp: any) => {
        // Убедись, что путь правильный (resp.data.products)
        this.productArr = resp.data?.products || resp; 
        this.filteredArr = [...this.productArr];
        this.cdr.detectChanges();
      },
      error: er => alert(er.message)
    });
  }

  // Главная функция фильтрации
  applyFilters() {
    this.filteredArr = this.productArr.filter(item => {
      const s = this.searchQuery.toLowerCase();
      return item.name.toLowerCase().includes(s) &&
             item.price >= this.minPrice &&
             item.price <= this.maxPrice &&
             item.rate >= this.minRate;
    });
  }

  // Сортировка (по цене или рейтингу)
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