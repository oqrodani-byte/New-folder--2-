import { ChangeDetectorRef, Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { Api } from '../services/api';
import { FormsModule } from '@angular/forms';
import { Auth } from '../services/auth';

@Component({
  selector: 'app-login',
  imports: [RouterModule,FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
export class Login {
  constructor(private api:Api, private cdr:ChangeDetectorRef, private router:Router
    ,private auth:Auth
  ){
    
  }
  
  login(data:any){
    this.api.login(data).subscribe({
      next: (res: any) => {
        alert('user logged in succesfully')
        this.router.navigate(['/home']) 
        localStorage.setItem('refreshToken',res.data.refreshToken)
        localStorage.setItem('accessToken',res.data.accessToken)
        this.auth.authorize()
        this.cdr.detectChanges()
        
      },
      error: error => {
        alert(error.message)
      }
    })  
  }
}
