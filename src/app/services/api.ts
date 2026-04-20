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

 
  baseUrl = ''; 

  
  getData(url: string) {
    return this.http.get(this.baseUrl + url);
  }

 
  postData(url: string, body: any) {
    return this.http.post(this.baseUrl + url, body);
  }
}