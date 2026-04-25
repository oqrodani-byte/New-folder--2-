import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class Api {
  postObj(arg0: string, value: any) {
    throw new Error('Method not implemented.');
  }
  private http = inject(HttpClient);

 
  baseUrl = 'https://restaurantapi.stepacademy.ge/api/'; 

  headers = {
      "X-API-KEY" : "1f22d8a0-8e2c-41e3-a026-ed8c48db07b0"
  }


  
  getData(url: string) {
    return this.http.get(this.baseUrl + url, {
      headers : this.headers
    });
  }


  postData(url: string, body: any) {
    return this.http.post(this.baseUrl + url, body,  {
      headers : this.headers
    });
  }
}