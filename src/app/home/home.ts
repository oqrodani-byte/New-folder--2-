import { ChangeDetectorRef, Component } from '@angular/core';
import { Helper } from '../services/helper';
import { Api } from '../services/api';
import { Product } from '../models/product';
import { Router, RouterLink } from "@angular/router";

@Component({
  selector: 'app-home',
  imports: [RouterLink],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home {
   
}