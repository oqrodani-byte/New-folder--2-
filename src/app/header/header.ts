import { Component, effect, signal } from '@angular/core';
import { RouterLink, RouterModule } from "@angular/router";
import { Auth } from '../services/auth';

@Component({
  selector: 'app-header',
  imports: [RouterModule],
  templateUrl: './header.html',
  styleUrl: './header.scss',
})
export class Header {

  constructor(private auth:Auth){
    effect(() => {
      this.isAuthorized.set(this.auth.authorized())
    }
  )
    
  }
  isAuthorized = signal(false)
  logout(){
    localStorage.removeItem('accessToken')
    localStorage.removeItem('refreshToken')
    this.auth.unauthorize()
  }
  

onKeyDown(event: KeyboardEvent) {
  if (event.ctrlKey && event.key === 'k') {
    console.log('Ctrl + k pressed');
  }
}



}
