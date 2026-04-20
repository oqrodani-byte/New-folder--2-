import { Component } from '@angular/core';
import { Api } from '../services/api';
import { LoginUser } from '../models/user';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router'; 

@Component({
  selector: 'app-login',
  imports: [FormsModule, CommonModule],
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
export class Login {

  constructor(
    private api: Api, 
    private http: HttpClient, 
    private router: Router 
  ) {}

  loginUser: LoginUser = {
    email: "stepacc210@gmail.com",
    password: "Stepacc210@gmail.com"
  }

  login(form: any) {
    console.log(form.value);

    
    this.http.post("auth/login", form.value)
      .subscribe((resp: any) => {
        if (resp.data?.accessToken) {
          
          localStorage.setItem("token", resp.data.accessToken); 
          
          console.log("Токен получен и сохранен!");

          
          this.router.navigateByUrl("/details"); 
        } else {
          console.log("Токен не найден в ответе сервера");
        }
      }, (err) => {
        console.error("Ошибка при входе:", err);
      });
  }
}