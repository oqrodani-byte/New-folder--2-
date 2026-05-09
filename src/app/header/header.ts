import { Component, HostListener, inject } from '@angular/core';
import { RouterModule } from "@angular/router";
import { Auth } from '../services/auth';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './header.html',
  styleUrl: './header.scss',
})
export class Header {

  constructor(public auth: Auth) {}

  logout() {
   
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    
   
    this.auth.unauthorize();
  }


  @HostListener('window:keydown', ['$event'])
  onKeyDown(event: KeyboardEvent) {
    if (event.ctrlKey && event.key === 'k') {
      event.preventDefault(); 
      console.log('Ctrl + k pressed - Opening search...');
      
    }
  }
}