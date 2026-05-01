import { ChangeDetectorRef, Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Api } from '../services/api';

@Component({
  selector: 'app-register',
  imports: [FormsModule],
  templateUrl: './register.html',
  styleUrl: './register.scss',
})
export class Register {
  constructor(private api:Api, private cdr:ChangeDetectorRef){
  }
  code = ''
  email = ''
  showInput = true
  register(data:any){
    this.api.register(data).subscribe( {
      next:(res: any) => {
        this.showInput = true 
        this.cdr.detectChanges()
      alert('user registered succesfully')
      console.log(res);
    },
    error: error => {
      alert(error.message)
    }
    })

  }
  verify(){
    this.api.verify({email:this.email,code:this.code}).subscribe({
      next: (res: any) => {
      alert('user verified succesfully')
    },
    error: error => {
      alert(error.message)
    }
    })
  }


}
