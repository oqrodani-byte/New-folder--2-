import { ChangeDetectorRef, Component, OnInit, inject } from '@angular/core';
import { Api } from '../services/api';
import { Product } from '../models/product';
import { RouterLink } from "@angular/router";

@Component({
  selector: 'app-home',
  standalone: true, // Assuming standalone based on your imports array
  imports: [RouterLink],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home implements OnInit {
  private api = inject(Api);
  private cdr = inject(ChangeDetectorRef);

  favorites: Product[] = [];

  ngOnInit() {
    this.api.getData('products').subscribe({
      next: (resp: any) => {
        // Handle response format: either the array itself or resp.data.products
        const allProducts: Product[] = resp.data?.products || resp;

        // 1. Sort by rating (descending)
        // 2. Slice to get only the first 6
        this.favorites = allProducts
          .sort((a, b) => b.rate - a.rate)
          .slice(0, 6);

        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error('Could not load favorite dishes:', err);
      }
    });
  }
}