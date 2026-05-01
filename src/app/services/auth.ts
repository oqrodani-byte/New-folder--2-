import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class Auth {
  authorized = signal(localStorage.getItem('accessToken') ? true : false)

  authorize(){
    this.authorized.set(true)
  }

  unauthorize(){
    this.authorized.set(false)
  }

}
