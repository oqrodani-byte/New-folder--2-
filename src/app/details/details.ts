import { ChangeDetectorRef, Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Api } from '../services/api';
import { CommonModule } from '@angular/common';
import { Product } from '../models/product';
import { RouterLink, RouterModule } from "@angular/router";

@Component({
  selector: 'app-details',
  standalone: true, 
  imports: [CommonModule],
  templateUrl: './details.html',
  styleUrl: './details.scss',
})
export class Details implements OnInit {

  private route = inject(ActivatedRoute);
  private api = inject(Api);
  private cdr = inject(ChangeDetectorRef);
  private router = inject(ActivatedRoute)



  product: any = null; 
  isLoading: boolean = true;
  selectedId = 0
  ngOnInit() {

    
     this.router.queryParams.subscribe(data =>{
        this.selectedId = data['id']
    })

    if (this.selectedId) {
     
      this.api.getData('products/' + this.selectedId).subscribe({
        next: (resp: any) => {
          
          this.product = resp.data;
          this.isLoading = false;
          
    
          this.cdr.detectChanges(); 
        },
        error: (err) => {
          console.error('error', err);
          this.isLoading = false;
        }
      });
    }
  }
}