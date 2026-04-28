import { ChangeDetectorRef, Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Api } from '../services/api';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-details',
  standalone: true, // Убедись, что компонент Standalone, если используешь последние версии Angular
  imports: [CommonModule],
  templateUrl: './details.html',
  styleUrl: './details.scss',
})
export class Details implements OnInit {
  // Используем inject для чистоты кода
  private route = inject(ActivatedRoute);
  private api = inject(Api);
  private cdr = inject(ChangeDetectorRef);

  product: any = null; // Сюда прилетят данные из API
  isLoading: boolean = true;

  ngOnInit() {
    // 1. Вытаскиваем ID из ссылки (например, /details/2)
    const id = this.route.snapshot.paramMap.get('id');

    if (id) {
      // 2. Делаем запрос через твой сервис
      this.api.getData('products/' + id).subscribe({
        next: (resp: any) => {
          // В твоем API данные лежат в поле data
          this.product = resp.data;
          this.isLoading = false;
          
          // Принудительно обновляем UI, так как ты используешь ChangeDetectorRef в меню
          this.cdr.detectChanges(); 
        },
        error: (err) => {
          console.error('Ошибка загрузки блюда:', err);
          this.isLoading = false;
        }
      });
    }
  }
}