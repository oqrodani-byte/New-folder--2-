import { ChangeDetectorRef, Component, OnInit, inject } from '@angular/core';
import { Api } from '../services/api';
import { Product } from '../models/product';
import { RouterLink, RouterModule } from "@angular/router";

@Component({
  selector: 'app-home',
  standalone: true, 
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
       
        const allProducts: Product[] = resp.data?.products || resp;


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